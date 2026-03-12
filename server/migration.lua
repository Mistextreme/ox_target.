-- Target Settings Migration Utility
-- Migrates player settings from old GlobalState storage to new StateBag system

-- Command to migrate all player target settings
RegisterCommand("migratetargetsettings", function(source, args, rawCommand)
    -- Only allow execution from server console
    if source ~= 0 then
        return
    end
    
    print("^3Starting target settings migration...^7")
    
    local migratedCount = 0
    
    -- Get all resource KVP keys
    local allKeys = GetResourceKvpKeys("")
    
    -- Iterate through all keys to find license-based settings
    for i = 1, #allKeys do
        local key = allKeys[i]
        
        -- Check if this is a license identifier key
        if key:sub(1, 8) == "license:" then
            -- Verify the key has saved data
            local savedData = GetResourceKvpString(key)
            
            if savedData then
                -- Check if this key still exists in GlobalState (old system)
                local globalStateValue = GlobalState[key]
                
                if globalStateValue then
                    -- Remove from GlobalState as it's now in KVP storage
                    GlobalState[key] = nil
                    migratedCount = migratedCount + 1
                end
            end
        end
    end
    
    print(("^2Migration complete! Migrated %d player settings from GlobalState to StateBags^7"):format(migratedCount))
end, true)
