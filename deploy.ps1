# Neon Game Deployment Script
param(
    [switch]$Dev = $false,
    [switch]$Prod = $false,
    [switch]$Install = $false,
    [switch]$Build = $false
)

$ErrorActionPreference = "Continue"
$NeonGameDir = $PSScriptRoot

# Color functions
function Write-Success { param($msg) Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Error-Custom { param($msg) Write-Host "✗ $msg" -ForegroundColor Red }
function Write-Info { param($msg) Write-Host "ℹ $msg" -ForegroundColor Cyan }

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Neon Game - Browser Game             ║" -ForegroundColor Cyan
Write-Host "║   Platform Deployment                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error-Custom "npm not found. Install Node.js from https://nodejs.org/"
    exit 1
}

$npmVersion = npm --version
Write-Success "npm: v$npmVersion"

cd $NeonGameDir

# Install dependencies
if ($Install -or -not (Test-Path "$NeonGameDir\node_modules")) {
    Write-Info "Installing dependencies..."
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dependencies installed"
    }
    else {
        Write-Error-Custom "Failed to install dependencies"
        exit 1
    }
}

# Build for production
if ($Build -or $Prod) {
    Write-Info "Building game for production..."
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Production build complete"
        Write-Info "Build output: dist/"
    }
    else {
        Write-Error-Custom "Build failed"
        exit 1
    }
}

# Run game
Write-Host ""

if ($Prod -and (Test-Path "$NeonGameDir\dist")) {
    # Serve production build
    Write-Info "Serving production build on port 3008..."
    npx serve -s dist -l 3008
}
else {
    # Development mode (default)
    Write-Info "Starting development server on port 3008..."
    npm run dev -- --port 3008
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Success "Neon Game Deployment Complete"
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Info "Game URL: http://localhost:3008"
Write-Host ""
