if not lib.checkDependency('ox_lib', '3.30.0', true) then return end

lib.locale()

local utils   = require 'client.utils'
local state   = require 'client.state'
local options = require 'client.api'.getTargetOptions()

require 'client.debug'
require 'client.defaults'
require 'client.compat.qtarget'
require 'client.compat.qb-target'

-- Locals (natives / globals)
local SendNuiMessage = SendNuiMessage
local GetEntityCoords = GetEntityCoords
local GetEntityType = GetEntityType
local HasEntityClearLosToEntity = HasEntityClearLosToEntity
local GetEntityBoneIndexByName = GetEntityBoneIndexByName
local GetEntityBonePosition_2 = GetEntityBonePosition_2
local GetEntityModel = GetEntityModel
local IsDisabledControlJustPressed = IsDisabledControlJustPressed
local DisableControlAction = DisableControlAction
local DisablePlayerFiring = DisablePlayerFiring
local GetModelDimensions = GetModelDimensions
local GetOffsetFromEntityInWorldCoords = GetOffsetFromEntityInWorldCoords
local GetGameTimer = GetGameTimer
local DoesEntityExist = DoesEntityExist

-- State
local currentTarget = {}
local currentMenu
local menuChanged
local menuHistory = {}
local nearbyZones

-- Config toggles
local toggleHotkey = GetConvarInt('ox_target:toggleHotkey', 0) == 1
local mouseButton  = GetConvarInt('ox_target:leftClick', 1) == 1 and 24 or 25
local debug        = GetConvarInt('ox_target:debug', 0) == 1
local vec0         = vec3(0, 0, 0)

-- Perf knobs (ConVars so you can tune without rebuild)
local UPDATE_COOLDOWN       = tonumber(GetConvar('ox_target:updateCooldown', '60')) or 60
local FOCUS_SLEEP_MS        = tonumber(GetConvar('ox_target:focusSleep', '60')) or 60
local SCAN_INTERVAL_HIT_MS  = tonumber(GetConvar('ox_target:scanHit', '40')) or 40
local SCAN_INTERVAL_IDLE_MS = tonumber(GetConvar('ox_target:scanIdle', '80')) or 80
local SECOND_RAYCAST_CD_MS  = tonumber(GetConvar('ox_target:altRaycastCooldown', '120')) or 120
local CANI_THROTTLE_MS      = tonumber(GetConvar('ox_target:canInteractThrottle', '120')) or 120

-- Targeting stability (new ConVars for tuning)
local STICK_TIME      = tonumber(GetConvar('ox_target:stickTime', '200')) or 200        -- ms to stick to target
local SMOOTH_FACTOR   = tonumber(GetConvar('ox_target:smoothFactor', '0.3')) or 0.3     -- coordinate smoothing
local BONE_TOLERANCE  = tonumber(GetConvar('ox_target:boneTolerance', '3.0')) or 3.0    -- bone detection range
local OFFSET_TOLERANCE = tonumber(GetConvar('ox_target:offsetTolerance', '1.5')) or 1.5 -- offset detection range
local CLOSE_RANGE_LOS = tonumber(GetConvar('ox_target:closeRangeLOS', '3.0')) or 3.0    -- ignore LOS at this distance

-- Debounce / hash
local lastOptionsHash = ""
local lastUpdateTime  = 0
local sentLeftAt      = 0
local lastClickAt     = 0
local CLICK_GUARD_MS  = 200
local lastSelectAt    = 0
local SELECT_GUARD_MS = 250
local lastAltRaycastAt = 0

-- Caches
local modelDimCache = {}
local boneIndexCache = setmetatable({}, { __mode = 'k' })
local tickGroupMemo = {}
local tickItemsMemo = {}

-- Targeting stability caches
local raycastCache = {
    lastEntity = 0,
    stickTime = 0,
    smoothCoords = vec3(0, 0, 0)
}

-- ----------------------
-- Helpers / perf utils
-- ----------------------

---@param totalOptions number
---@param hidden number
---@param zonesCount number
---@return string
local function generateOptionsHash(totalOptions, hidden, zonesCount)
    local entityHash = currentTarget.entity or 0
    local menuHash = currentMenu or "root"
    return string.format("%d_%d_%d_%d_%s", entityHash, totalOptions, hidden, zonesCount, menuHash)
end

local function emitLeftTarget()
    local now = GetGameTimer()
    if (now - sentLeftAt) > 50 then
        SendNuiMessage('{"event": "leftTarget"}')
        sentLeftAt = now
    end
end

local function safeSendSetTarget(visibleOptions, visibleZones, totalOptions, hidden)
    -- Count visible zones (cheap)
    local zonesCount = 0
    if type(visibleZones) == 'table' then
        if visibleZones[1] ~= nil then
            for i = 1, #visibleZones do
                local bucket = visibleZones[i]
                zonesCount = zonesCount + ((type(bucket) == 'table' and #bucket) or 0)
            end
        else
            for _, bucket in pairs(visibleZones) do
                zonesCount = zonesCount + ((type(bucket) == 'table' and #bucket) or 0)
            end
        end
    end

    local newHash = generateOptionsHash(totalOptions, hidden, zonesCount)
    local now = GetGameTimer()

    if newHash == lastOptionsHash and (now - lastUpdateTime) < UPDATE_COOLDOWN then
        return
    end

    lastOptionsHash = newHash
    lastUpdateTime  = now

    SendNuiMessage(json.encode({
        event = 'setTarget',
        options = visibleOptions,
        zones = visibleZones,
    }))
end

-- Tiny stable key for per-tick memo (avoid building strings from big tables)
local function ptrkey(t) return tostring(t):gsub("table: ", "") end

-- Visibility checks (optimized with improved tolerances)
---@param option OxTargetOption
---@param distance number
---@param endCoords vector3
---@param entityHit? number
---@param entityType? number
---@param entityModel? number | false
---@param now number
local function shouldHide(option, distance, endCoords, entityHit, entityType, entityModel, now)
    -- 0) Fast menu filter
    if option.menuName ~= currentMenu then
        return true
    end

    -- 1) Distance gating
    local maxDistance = option.distance or 7
    if distance > maxDistance then
        return true
    end

    -- 2) Group/items check (memoize per tick)
    if option.groups then
        local gk = option.__gk or ('g:' .. ptrkey(option.groups))
        option.__gk = gk
        local grp = tickGroupMemo[gk]
        if grp == nil then
            grp = utils.hasPlayerGotGroup(option.groups) and true or false
            tickGroupMemo[gk] = grp
        end
        if not grp then return true end
    end

    if option.items then
        local ik = option.__ik or ('i:' .. ptrkey(option.items) .. (option.anyItem and ':1' or ':0'))
        option.__ik = ik
        local itm = tickItemsMemo[ik]
        if itm == nil then
            itm = utils.hasPlayerGotItems(option.items, option.anyItem) and true or false
            tickItemsMemo[ik] = itm
        end
        if not itm then return true end
    end

    -- 3) Bone gating with improved tolerance
    local bone = entityModel and option.bones or nil
    if bone then
        ---@cast entityHit number
        local cacheE = boneIndexCache[entityHit]
        if not cacheE then
            cacheE = {}
            boneIndexCache[entityHit] = cacheE
        end

        local _type = type(bone)
        local boneId = -1

        if _type == 'string' then
            boneId = cacheE[bone]
            if not boneId then
                boneId = GetEntityBoneIndexByName(entityHit, bone)
                cacheE[bone] = boneId
            end
            -- Use improved bone tolerance
            if boneId == -1 or #(endCoords - GetEntityBonePosition_2(entityHit, boneId)) > BONE_TOLERANCE then
                return true
            end
        elseif _type == 'table' then
            local closestBone, closestDistance = nil, BONE_TOLERANCE
            for j = 1, #bone do
                local name = bone[j]
                local idx = cacheE[name]
                if not idx then
                    idx = GetEntityBoneIndexByName(entityHit, name)
                    cacheE[name] = idx
                end
                if idx ~= -1 then
                    local dist = #(endCoords - GetEntityBonePosition_2(entityHit, idx))
                    if dist < closestDistance then
                        closestBone = idx
                        closestDistance = dist
                    end
                end
            end
            if not closestBone then
                return true
            end
            bone = closestBone
        end
    end

    -- 4) Offset gating with improved tolerance
    local offset = entityModel and option.offset or nil
    if offset then
        ---@cast entityHit number
        if not option.absoluteOffset then
            local dims = modelDimCache[entityModel]
            local min, max
            if dims then
                min, max = dims[1], dims[2]
            else
                min, max = GetModelDimensions(entityModel)
                modelDimCache[entityModel] = { min, max }
            end
            offset = (max - min) * offset + min
        end

        offset = GetOffsetFromEntityInWorldCoords(entityHit, offset.x, offset.y, offset.z)
        -- Use improved offset tolerance
        if #(endCoords - offset) > (option.offsetSize or OFFSET_TOLERANCE) then
            return true
        end
    end

    -- 5) canInteract (throttled)
    if option.canInteract then
        local nextAt = option.__nextCaniAt or 0
        if now >= nextAt then
            local ok = false
            local success, resp = pcall(option.canInteract, entityHit, distance, endCoords, option.name, bone)
            ok = (success and resp) and true or false
            option.__lastCani = ok
            option.__nextCaniAt = now + CANI_THROTTLE_MS
        end
        return not option.__lastCani
    end

    return false
end

-- ----------------------
-- Targeting entry
-- ----------------------
local function startTargeting()
    if state.isDisabled() or state.isActive() or IsNuiFocused() or IsPauseMenuActive() then return end

    SendNUIMessage({
        event = "setTargetConfigOptions",
        data = GetTargetSettings()
    })

    state.setActive(true)

    local flag = 511
    local hit, entityHit, endCoords, distance, lastEntity, entityType, entityModel, hasTarget, zonesChanged
    local zones = {}
    
    -- Reset targeting stability cache
    raycastCache.lastEntity = 0
    raycastCache.stickTime = 0
    raycastCache.smoothCoords = vec3(0, 0, 0)

    -- Lightweight draw/input loop (always on while active)
    CreateThread(function()
        local dict, texture = utils.getTexture()
        local lastCoords

        while state.isActive() do
            lastCoords = endCoords == vec0 and lastCoords or endCoords or vec0

            if debug then
                DrawMarker(
                    28, lastCoords.x, lastCoords.y, lastCoords.z,
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.2, 0.2, 0.2,
                    255, 42, 24, 100, false, false, 0, true, false, false, false
                )
            end

            utils.drawZoneSprites(dict, texture)

            -- Don't allow firing / melee while targeting
            DisablePlayerFiring(cache.playerId, true)
            DisableControlAction(0, 25,  true)
            DisableControlAction(0, 140, true)
            DisableControlAction(0, 141, true)
            DisableControlAction(0, 142, true)

            if state.isNuiFocused() then
                -- Freeze camera while menu is open
                DisableControlAction(0, 1, true)
                DisableControlAction(0, 2, true)

                -- RMB (or chosen) closes NUI focus
                if (not hasTarget or options) and IsDisabledControlJustPressed(0, 25) then
                    state.setNuiFocus(false, false)
                end
            elseif hasTarget and IsDisabledControlJustPressed(0, mouseButton) then
                -- Debounce open click (prevents double-focus spam)
                local now = GetGameTimer()
                if (now - lastClickAt) > CLICK_GUARD_MS then
                    lastClickAt = now
                    state.setNuiFocus(true, true)
                end
            end

            Wait(0)
        end

        SetStreamedTextureDictAsNoLongerNeeded(dict)
    end)

    -- Heavy loop (raycast, visibility, payload)
    while state.isActive() do
        -- If a lib progress is running, exit
        if not state.isNuiFocused() and lib.progressActive() then
            state.setActive(false)
            break
        end

        local now = GetGameTimer()

        if not state.isNuiFocused() then
            -- per-tick memos: clear each pass
            table.wipe(tickGroupMemo)
            table.wipe(tickItemsMemo)

            -- Raycast with coordinate smoothing
            local playerCoords = GetEntityCoords(cache.ped)
            local rawHit, rawEntityHit, rawEndCoords = lib.raycast.fromCamera(flag, 4, 20)
            
            -- Apply coordinate smoothing to reduce jitter
            if raycastCache.smoothCoords == vec0 then
                raycastCache.smoothCoords = rawEndCoords
            else
                raycastCache.smoothCoords = raycastCache.smoothCoords + (rawEndCoords - raycastCache.smoothCoords) * SMOOTH_FACTOR
            end
            
            hit = rawHit
            endCoords = raycastCache.smoothCoords
            distance = #(playerCoords - endCoords)
            
            -- Entity stickiness logic
            local shouldCheckNewEntity = false
            
            if rawEntityHit ~= 0 and rawEntityHit == raycastCache.lastEntity then
                -- Same entity, refresh stick time
                raycastCache.stickTime = now + STICK_TIME
                entityHit = rawEntityHit
            elseif raycastCache.stickTime > now and raycastCache.lastEntity ~= 0 then
                -- Still in stick time, keep last entity if it's valid
                if DoesEntityExist(raycastCache.lastEntity) and 
                   #(GetEntityCoords(raycastCache.lastEntity) - endCoords) < 5.0 then
                    entityHit = raycastCache.lastEntity
                else
                    shouldCheckNewEntity = true
                end
            else
                shouldCheckNewEntity = true
            end
            
            if shouldCheckNewEntity then
                entityHit = rawEntityHit
                if entityHit ~= 0 then
                    raycastCache.lastEntity = entityHit
                    raycastCache.stickTime = now + STICK_TIME
                end
            end

            if entityHit ~= 0 and entityHit ~= lastEntity then
                local success, result = pcall(GetEntityType, entityHit)
                entityType = success and result or 0
            end

            -- Fallback raycast only on cooldown and when no target
            if entityType == 0 and not hasTarget and (now - lastAltRaycastAt) >= SECOND_RAYCAST_CD_MS then
                local _flag = flag == 511 and 26 or 511
                local _hit, _entityHit, _endCoords = lib.raycast.fromCamera(_flag, 4, 20)
                local _distance = #(playerCoords - _endCoords)

                if _distance < distance and _entityHit ~= 0 then
                    flag, hit, entityHit, endCoords, distance = _flag, _hit, _entityHit, _endCoords, _distance
                    raycastCache.lastEntity = _entityHit
                    raycastCache.stickTime = now + STICK_TIME

                    if entityHit ~= 0 then
                        local success, result = pcall(GetEntityType, entityHit)
                        entityType = success and result or 0
                    end
                end

                lastAltRaycastAt = now
            end

            nearbyZones, zonesChanged = utils.getNearbyZones(endCoords)

            local entityChanged = entityHit ~= lastEntity
            local newOptions = (zonesChanged or entityChanged or menuChanged) and true

            if entityHit > 0 and entityChanged then
                currentMenu = nil

                -- More lenient LOS check
                if flag ~= 511 then
                    local hasLOS = HasEntityClearLosToEntity(entityHit, cache.ped, 7)
                    -- Allow targeting if very close even without perfect LOS
                    if not hasLOS and distance > CLOSE_RANGE_LOS then
                        entityHit = 0
                    end
                end

                if lastEntity ~= entityHit and debug then
                    if lastEntity then
                        SetEntityDrawOutline(lastEntity, false)
                    end

                    if entityType ~= 1 then
                        SetEntityDrawOutline(entityHit, true)
                    end
                end

                if entityHit > 0 then
                    local success, result = pcall(GetEntityModel, entityHit)
                    entityModel = success and result
                end
            end

            if hasTarget and (zonesChanged or (entityChanged and hasTarget > 1)) then
                emitLeftTarget()

                if entityChanged then options:wipe() end
                if debug and lastEntity and lastEntity > 0 then SetEntityDrawOutline(lastEntity, false) end

                hasTarget = false
            end

            if newOptions and entityModel and entityHit > 0 then
                options:set(entityHit, entityType, entityModel)
            end

            lastEntity = entityHit
            currentTarget.entity   = entityHit
            currentTarget.coords   = endCoords
            currentTarget.distance = distance

            local hidden = 0
            local totalOptions = 0

            for k, v in pairs(options) do
                local optionCount = #v
                local dist = k == '__global' and 0 or distance
                totalOptions = totalOptions + optionCount

                for i = 1, optionCount do
                    local opt = v[i]
                    local hide = shouldHide(opt, dist, endCoords, entityHit, entityType, entityModel, now)

                    if opt.hide ~= hide then
                        opt.hide = hide
                        newOptions = true
                    end

                    if hide then hidden = hidden + 1 end
                end
            end

            if zonesChanged then table.wipe(zones) end

            for i = 1, #nearbyZones do
                local zoneOptions = nearbyZones[i].options
                local optionCount = #zoneOptions
                totalOptions = totalOptions + optionCount
                zones[i] = zoneOptions

                for j = 1, optionCount do
                    local opt = zoneOptions[j]
                    local hide = shouldHide(opt, distance, endCoords, entityHit, nil, nil, now)

                    if opt.hide ~= hide then
                        opt.hide = hide
                        newOptions = true
                    end

                    if hide then hidden = hidden + 1 end
                end
            end

            if newOptions then
                if hasTarget == 1 and (totalOptions - hidden) > 1 then
                    hasTarget = true
                end

                if hasTarget and hidden == totalOptions then
                    if hasTarget and hasTarget ~= 1 then
                        hasTarget = false
                        emitLeftTarget()
                    end
                elseif menuChanged or (hasTarget ~= 1 and hidden ~= totalOptions) then
                    hasTarget = options.size

                    if currentMenu and options.__global and options.__global[1] and options.__global[1].name ~= 'builtin:goback' then
                        table.insert(options.__global, 1, {
                            icon = 'fa-solid fa-circle-chevron-left',
                            label = locale('go_back'),
                            name = 'builtin:goback',
                            menuName = currentMenu,
                            openMenu = 'home'
                        })
                    end

                    -- Build visible maps with index mapping
                    local visibleOptions = {}
                    local indexMap = {}

                    for k, v in pairs(options) do
                        local vi = 0
                        for i = 1, #v do
                            local opt = v[i]
                            if not opt.hide then
                                vi = vi + 1
                                if not visibleOptions[k] then visibleOptions[k] = {} end
                                if not indexMap[k] then indexMap[k] = {} end
                                visibleOptions[k][vi] = opt
                                indexMap[k][vi] = i
                            end
                        end

                        if not visibleOptions[k] or #visibleOptions[k] == 0 then
                            visibleOptions[k] = nil
                            indexMap[k] = nil
                        end
                    end

                    -- Zones visible lists + index maps
                    local visibleZones = {}
                    local zoneIndexMap = {}

                    for i = 1, #zones do
                        local zi = zones[i]
                        if zi then
                            local vi = 0
                            for j = 1, #zi do
                                local zopt = zi[j]
                                if not zopt.hide then
                                    vi = vi + 1
                                    if not visibleZones[i] then visibleZones[i] = {} end
                                    if not zoneIndexMap[i] then zoneIndexMap[i] = {} end
                                    visibleZones[i][vi] = zopt
                                    zoneIndexMap[i][vi] = j
                                end
                            end

                            if not visibleZones[i] or #visibleZones[i] == 0 then
                                visibleZones[i] = nil
                                zoneIndexMap[i] = nil
                            end
                        end
                    end

                    -- Store maps for NUI select mapping
                    currentTarget.indexMap = indexMap
                    currentTarget.zoneIndexMap = zoneIndexMap

                    -- Debounced send
                    safeSendSetTarget(visibleOptions, visibleZones, totalOptions, hidden)
                end

                menuChanged = false
            end
        else
            -- UI focused: keep loop light, avoid recompute/push
            hit = false
            Wait(FOCUS_SLEEP_MS)
        end

        if toggleHotkey and IsPauseMenuActive() then
            state.setActive(false)
        end

        -- Adaptive wait times based on activity
        local waitTime = SCAN_INTERVAL_HIT_MS
        if not hit then
            waitTime = SCAN_INTERVAL_IDLE_MS
        elseif not hasTarget then
            waitTime = (SCAN_INTERVAL_HIT_MS + SCAN_INTERVAL_IDLE_MS) / 2
        end

        Wait(waitTime)
    end

    -- Cleanup
    if lastEntity and debug then
        SetEntityDrawOutline(lastEntity, false)
    end

    state.setNuiFocus(false)
    SendNuiMessage('{"event": "visible", "state": false}')

    -- Clear when targeting ends
    table.wipe(currentTarget)
    table.wipe(raycastCache)
    options:wipe()
    if nearbyZones then table.wipe(nearbyZones) end

    lastOptionsHash = ""
    lastUpdateTime  = 0
end

-- Keybinds
do
    ---@type KeybindProps
    local keybind = {
        name = 'ox_target',
        defaultKey = GetConvar('ox_target:defaultHotkey', 'LMENU'),
        defaultMapper = 'keyboard',
        description = locale('toggle_targeting'),
    }

    if toggleHotkey then
        function keybind:onPressed()
            if state.isActive() then
                return state.setActive(false)
            end
            return startTargeting()
        end
    else
        keybind.onPressed = startTargeting
        function keybind:onReleased()
            state.setActive(false)
        end
    end

    lib.addKeybind(keybind)
end

-- Response packing for callbacks/exports
---@generic T
---@param option T
---@param server? boolean
---@return T
local function getResponse(option, server)
    local response = table.clone(option)
    response.entity   = currentTarget.entity
    response.zone     = currentTarget.zone
    response.coords   = currentTarget.coords
    response.distance = currentTarget.distance

    if server then
        response.entity = response.entity ~= 0 and NetworkGetEntityIsNetworked(response.entity)
            and NetworkGetNetworkIdFromEntity(response.entity) or 0
    end

    response.icon        = nil
    response.groups      = nil
    response.items       = nil
    response.canInteract = nil
    response.onSelect    = nil
    response.export      = nil
    response.event       = nil
    response.serverEvent = nil
    response.command     = nil

    return response
end

-- NUI select (debounced)
RegisterNUICallback('select', function(data, cb)
    local now = GetGameTimer()
    if (now - lastSelectAt) < SELECT_GUARD_MS then
        cb(0)
        return
    end
    lastSelectAt = now
    cb(1)

    local zone = data[3] and nearbyZones and nearbyZones[data[3]] or nil

    ---@type OxTargetOption?
    local option

    if zone then
        local originalIndex = (currentTarget.zoneIndexMap and currentTarget.zoneIndexMap[data[3]]
            and currentTarget.zoneIndexMap[data[3]][data[2]]) or data[2]
        option = zone.options[originalIndex]
    else
        local originalIndex = (currentTarget.indexMap and currentTarget.indexMap[data[1]]
            and currentTarget.indexMap[data[1]][data[2]]) or data[2]
        option = options[data[1]] and options[data[1]][originalIndex] or nil
    end

    if option then
        if option.openMenu then
            local menuDepth = #menuHistory

            if option.name == 'builtin:goback' then
                option.menuName = option.openMenu
                option.openMenu = menuHistory[menuDepth]
                if menuDepth > 0 then
                    menuHistory[menuDepth] = nil
                end
            else
                menuHistory[menuDepth + 1] = currentMenu
            end

            menuChanged = true
            currentMenu = option.openMenu ~= 'home' and option.openMenu or nil
            options:wipe()
        else
            state.setNuiFocus(false)
        end

        currentTarget.zone = zone and zone.id or nil

        if option.onSelect then
            option.onSelect(option.qtarget and currentTarget.entity or getResponse(option))
        elseif option.export then
            exports[option.resource or (zone and zone.resource)][option.export](nil, getResponse(option))
        elseif option.event then
            TriggerEvent(option.event, getResponse(option))
        elseif option.serverEvent then
            TriggerServerEvent(option.serverEvent, getResponse(option, true))
        elseif option.command then
            ExecuteCommand(option.command)
        end

        if option.menuName == 'home' then return end
    end

    if (not option or not option.openMenu) and IsNuiFocused() then
        state.setActive(false)
    end
end)