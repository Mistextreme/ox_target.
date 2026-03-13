local defaults = Config["Target-Settings"]["Defaults"]
local settings = Config["Target-Settings"]["Settings"]

local playerSettings = {}

-- Returns a fresh table of default settings from Config.lua
-- Keys match exactly what build/index.js reads in the setTargetConfigOptions handler.
-- The NUI reads "defaultEyeColor" on load but saves back as "eyeColor" — both are
-- kept in sync here so the round-trip is consistent regardless of origin.
local function getDefaultSettings()
    return {
        mainColor        = defaults["Main-Color"],
        hoverColor       = defaults["Hover-Color"],
        backgroundColor  = defaults["Background-Color"],
        eyeIcon          = defaults["Eye-Icon"],
        eyeSize          = defaults["Eye-Size"],
        defaultEyeColor  = defaults["Eye-Color"],
        eyeColor         = defaults["Eye-Color"],
        eyeActiveColor   = defaults["Eye-Active-Color"],
        textColor        = defaults["Text-Color"],
        eyeLeft          = defaults["Eye-Left"],
        eyeTop           = defaults["Eye-Top"],
        uiScale          = defaults["UI-Scale"],
        textSize         = defaults["Text-Size"],
    }
end

-- Called from client/main.lua when targeting starts
function GetTargetSettings()
    if next(playerSettings) then
        return playerSettings
    end
    return getDefaultSettings()
end

-- Load saved settings from the server on resource start
AddEventHandler('onClientResourceStart', function(resource)
    if resource ~= GetCurrentResourceName() then return end

    lib.callback('ox_target:getPlayerSettings', false, function(data)
        if data then
            -- Normalise: ensure both key variants are present so the NUI
            -- always finds "defaultEyeColor" on load, regardless of which
            -- version originally saved the data.
            if data.eyeColor and not data.defaultEyeColor then
                data.defaultEyeColor = data.eyeColor
            elseif data.defaultEyeColor and not data.eyeColor then
                data.eyeColor = data.defaultEyeColor
            end

            playerSettings = data
        end
    end)
end)

-- NUI callback: player pressed "Save Settings" inside the settings panel
RegisterNUICallback('saveTargetConfigurations', function(data, cb)
    -- Normalise the eye-color keys before storing: the NUI sends "eyeColor"
    -- on save but reads "defaultEyeColor" on load, so keep both in sync.
    if data.eyeColor and not data.defaultEyeColor then
        data.defaultEyeColor = data.eyeColor
    elseif data.defaultEyeColor and not data.eyeColor then
        data.eyeColor = data.defaultEyeColor
    end

    playerSettings = data
    TriggerServerEvent('ox_target:savePlayerSettings', data)
    cb(1)
end)

-- NUI callback: player pressed ESC or close while settings are open
RegisterNUICallback('closeTargetSettings', function(data, cb)
    cb(1)
end)

-- Command: open the in-game target settings panel
if settings["Enable-Player-Menu"] then
    RegisterCommand(settings["Player-Menu-Command"], function()
        SendNuiMessage(json.encode({
            event = 'openTargetSettings'
        }))
    end, false)
end

-- Command: reset all target settings back to Config.lua defaults
if settings["Reset-Player-Target"] then
    RegisterCommand(settings["Player-Reset-Command"], function()
        playerSettings = getDefaultSettings()
        TriggerServerEvent('ox_target:savePlayerSettings', playerSettings)
        SendNuiMessage(json.encode({
            event = 'setTargetConfigOptions',
            data  = playerSettings,
        }))
    end, false)
end