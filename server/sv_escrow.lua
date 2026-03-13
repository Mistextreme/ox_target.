-- Resolves the license identifier for a given player source
---@param src number
---@return string | nil
local function getLicense(src)
    local license = GetPlayerIdentifierByType(src, 'license')

    if not license then
        for i = 0, GetNumPlayerIdentifiers(src) - 1 do
            local id = GetPlayerIdentifier(src, i)
            if id and id:sub(1, 8) == 'license:' then
                license = id
                break
            end
        end
    end

    return license
end

-- Server event: save player target UI settings to persistent KVP storage
RegisterNetEvent('ox_target:savePlayerSettings', function(data)
    local license = getLicense(source)
    if not license then return end

    SetResourceKvp(license, json.encode(data))
end)

-- Callback: send saved settings back to the requesting client
lib.callback.register('ox_target:getPlayerSettings', function(source)
    local license = getLicense(source)
    if not license then return nil end

    local saved = GetResourceKvpString(license)
    if saved then
        return json.decode(saved)
    end

    return nil
end)