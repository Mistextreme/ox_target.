Config = {}

Config["Target-Settings"] = {
    ["Settings"] = { -- Recommended to be on, Ultrawide monitor will scale UI smaller so adjustable scale very helpful!
        ["Enable-Player-Menu"] = true, -- Enables player customization menu
        ["Player-Menu-Command"] = "targetsettings", -- The command name for menu
        ["Reset-Player-Target"] = true, -- Enable player target reset to defaults below
        ["Player-Reset-Command"] = "targetreset", -- The command name for reset
    },
    ["Defaults"] = {
        ["UI-Scale"] = "1", -- default: "1"
        ["Text-Size"] = "1rem", -- default: "1rem"
        ["Sprite-Default-Color"] = vector(155,155,155,175), -- (Has to be rgba code in format of "123,123,123,123") (opacity ranges from 0-255 for the end)
        ["Sprite-Hover-Color"] = vector(161, 255, 95, 255), -- Has to be rgba code in same format as above ^ (having a zone color set on a target option will overwrite this color for that zone.)
        ["Main-Color"] = "#A1FF5F", -- default: "#A1FF5F"
        ["Hover-Color"] = "rgba(157, 255, 0, 0.082)", -- default: "rgba(157, 255, 0, 0.082)"
        ["Background-Color"] = "rgba(157, 255, 0, 0.014)", -- default: "rgba(157, 255, 0, 0.014)"
        ["Eye-Icon"] = "fas fa-circle", -- default: "fas fa-circle"
        ["Eye-Size"] = "4px", -- default: "4px"
        ["Eye-Color"] = "#fff", -- default: "#fff"
        ["Eye-Active-Color"] = "#A1FF5F", -- default: "#A1FF5F"
        ["Text-Color"] = "#fff", -- default: "#fff"
        ["Eye-Left"] = "-.19rem", -- default: "-.14rem"
        ["Eye-Top"] = "0rem", -- default: "0rem"
    }
}