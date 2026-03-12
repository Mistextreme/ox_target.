-- FX Information
fx_version 'cerulean'
use_experimental_fxv2_oal 'yes'
lua54 'yes'
game 'gta5'

-- Resource Information
name 'ox_target'
author 'Overextended'
version '1.17.2'
repository 'https://github.com/overextended/ox_target'
description ''

-- Manifest
ui_page 'build/index.html'

shared_scripts {
	'@ox_lib/init.lua',
	"Config.lua"
}

client_scripts {
	'client/cl_escrow.lua',
	'client/main.lua',
}

server_scripts {
	'server/main.lua',
	'server/sv_escrow.lua'
}

files {
	'build/**',
	'build/fonts/*.woff2',
	'locales/*.json',
	'client/api.lua',
	'client/utils.lua',
	'client/state.lua',
	'client/debug.lua',
	'client/defaults.lua',
	'client/framework/nd.lua',
	'client/framework/ox.lua',
	'client/framework/esx.lua',
	'client/framework/qb.lua',
	'client/framework/qbx.lua',
	'client/compat/qb-target.lua',
	'client/compat/qtarget.lua',
}

escrow_ignore {
	"Config.lua",
	'server/main.lua',
	'client/main.lua',
	'client/api.lua',
	'client/utils.lua',
	'client/state.lua',
	'client/debug.lua',
	'client/defaults.lua',
	'client/framework/nd.lua',
	'client/framework/ox.lua',
	'client/framework/esx.lua',
	'client/framework/qb.lua',
	'client/framework/qbx.lua',
	'client/compat/qb-target.lua',
	'client/compat/qtarget.lua',
}

provide 'qtarget'
provide 'qb-target'

dependency 'ox_lib'

dependency '/assetpacks'