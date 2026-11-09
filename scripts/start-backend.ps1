Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$hw03 = Split-Path -Parent $repo
$backend = Join-Path $hw03 'eshop-sut/backend'
$runtime = Join-Path $repo '.local/backend'
$modules = Join-Path $backend 'node_modules'

if (!(Test-Path -LiteralPath (Join-Path $modules 'sqlite3'))) {
    throw 'Install the backend dependencies first. See SETUP.md.'
}
if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) {
    throw 'Port 3000 is already in use. Stop that service before starting this backend.'
}

New-Item -ItemType Directory -Path $runtime -Force | Out-Null
foreach ($file in @('server.js', 'database.js')) {
    Copy-Item -LiteralPath (Join-Path $backend $file) -Destination (Join-Path $runtime $file)
}

$previousNodePath = $env:NODE_PATH
try {
    $env:NODE_PATH = $modules
    & node (Join-Path $runtime 'server.js')
    if ($LASTEXITCODE -ne 0) {
        throw "EShop backend exited with code $LASTEXITCODE."
    }
} finally {
    $env:NODE_PATH = $previousNodePath
}
