# 🔍 Pre-Deployment Verification Script for Ultra Seco
# Este script verifica que todos los archivos necesarios estén presentes

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Ultra Seco Pre-Deployment Check  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Función para verificar archivo
function Test-RequiredFile {
    param($FilePath, $Description)
    
    if (Test-Path $FilePath) {
        Write-Host "[✓] $Description" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[✗] $Description - FALTA" -ForegroundColor Red
        $script:errors++
        return $false
    }
}

# Función para verificar directorio
function Test-RequiredDirectory {
    param($DirPath, $Description)
    
    if (Test-Path $DirPath) {
        $count = (Get-ChildItem $DirPath -File).Count
        Write-Host "[✓] $Description ($count archivos)" -ForegroundColor Green
        return $true
    } else {
        Write-Host "[✗] $Description - FALTA" -ForegroundColor Red
        $script:errors++
        return $false
    }
}

# Verificar archivos HTML principales
Write-Host "`n📄 Archivos HTML Principales:" -ForegroundColor Yellow
Test-RequiredFile "index.html" "index.html - Página principal"

# Verificar archivos CSS/JS
Write-Host "`n🎨 Archivos CSS/JS:" -ForegroundColor Yellow
Test-RequiredFile "styles.css" "styles.css - Estilos principales"
Test-RequiredFile "script.js" "script.js - JavaScript principal"
Test-RequiredFile "catalog.js" "catalog.js - Catálogo de productos"
Test-RequiredFile "shopify-integration.js" "shopify-integration.js - Integración Shopify"

# Verificar directorios de assets
Write-Host "`n🖼️  Directorios de Assets:" -ForegroundColor Yellow
Test-RequiredDirectory "images" "images/ - Imágenes de productos"
Test-RequiredDirectory "assets" "assets/ - Assets visuales"
Test-RequiredDirectory "docs" "docs/ - Documentación PDF"
Test-RequiredDirectory "logo" "logo/ - Logos de marca"

# Verificar páginas de productos
Write-Host "`n🛍️  Páginas de Productos:" -ForegroundColor Yellow
$productPages = @(
    "aditivo.html",
    "cera.html",
    "champu.html",
    "eco.html",
    "escudo.html",
    "estuco.html",
    "exteriores.html",
    "fortificador.html",
    "interiores.html",
    "magnetron.html",
    "nano-aditivo.html",
    "pintura.html",
    "titan.html"
)

foreach ($page in $productPages) {
    if (Test-Path $page) {
        Write-Host "[✓] $page" -ForegroundColor Green
    } else {
        Write-Host "[!] $page - Opcional pero falta" -ForegroundColor Yellow
        $script:warnings++
    }
}

# Verificar configuración de Shopify
Write-Host "`n🛒 Verificación de Shopify:" -ForegroundColor Yellow
if (Test-Path "shopify-integration.js") {
    $content = Get-Content "shopify-integration.js" -Raw
    
    if ($content -match "cx0msw-x8\.myshopify\.com") {
        Write-Host "[✓] Dominio de Shopify encontrado" -ForegroundColor Green
    } else {
        Write-Host "[!] Verificar dominio de Shopify" -ForegroundColor Yellow
        $script:warnings++
    }
    
    if ($content -match "storefrontAccessToken") {
        Write-Host "[✓] Token de Shopify configurado" -ForegroundColor Green
    } else {
        Write-Host "[✗] Token de Shopify NO encontrado" -ForegroundColor Red
        $script:errors++
    }
} else {
    Write-Host "[✗] shopify-integration.js no encontrado" -ForegroundColor Red
    $script:errors++
}

# Verificar tamaño de archivos grandes
Write-Host "`n📊 Verificación de Tamaño:" -ForegroundColor Yellow
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { $_.Length -gt 5MB }
if ($largeFiles) {
    Write-Host "[!] Archivos grandes encontrados (>5MB):" -ForegroundColor Yellow
    foreach ($file in $largeFiles) {
        $sizeMB = [math]::Round($file.Length / 1MB, 2)
        Write-Host "    - $($file.Name): $sizeMB MB" -ForegroundColor Yellow
    }
    $script:warnings++
} else {
    Write-Host "[✓] No hay archivos excesivamente grandes" -ForegroundColor Green
}

# Resumen final
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Resumen de Verificación" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "`n✅ TODO LISTO PARA DEPLOYMENT" -ForegroundColor Green
    Write-Host "No se encontraron errores ni advertencias." -ForegroundColor Green
    exit 0
} elseif ($errors -eq 0) {
    Write-Host "`n⚠️  LISTO CON ADVERTENCIAS" -ForegroundColor Yellow
    Write-Host "Errores: $errors | Advertencias: $warnings" -ForegroundColor Yellow
    Write-Host "Puedes hacer deployment, pero revisa las advertencias." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "`n❌ NO LISTO PARA DEPLOYMENT" -ForegroundColor Red
    Write-Host "Errores: $errors | Advertencias: $warnings" -ForegroundColor Red
    Write-Host "Corrige los errores antes de hacer deployment." -ForegroundColor Red
    exit 1
}
