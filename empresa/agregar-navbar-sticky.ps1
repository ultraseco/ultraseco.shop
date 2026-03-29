# Script Automatizado - Agregar Navbar Sticky
# Ultra Seco Ecosistema
# Fecha: 2026-01-09

Write-Host "=== AGREGANDO NAVBAR STICKY A PÁGINAS RESTANTES ===" -ForegroundColor Cyan
Write-Host ""

$basePath = "c:\Users\benha\OneDrive\Desktop\ultra seco ecosistema\empresa"

# Lista de páginas que necesitan navbar sticky
$pagesToFix = @(
    "aditivo.html",
    "magnetron.html",
    "exteriores.html",
    "interiores.html",
    "index.html",
    "portal.html",
    "titan.html",
    "matriz-legal.html"
)

$successCount = 0
$errorCount = 0

foreach ($page in $pagesToFix) {
    $filePath = Join-Path $basePath $page
    
    if (-not (Test-Path $filePath)) {
        Write-Host "⚠️  Archivo no encontrado: $page" -ForegroundColor Yellow
        $errorCount++
        continue
    }
    
    Write-Host "Procesando: $page" -ForegroundColor Green
    
    try {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        $modified = $false
        
        # Patrón 1: Buscar <header> sin fixed
        if ($content -match '<header(?![^>]*\bfixed\b)[^>]*>') {
            Write-Host "  → Detectado header sin fixed" -ForegroundColor Cyan
            
            # Agregar fixed a headers que no lo tienen
            $content = $content -replace '<header\s+class="([^"]*)"(?![^>]*fixed)', '<header class="$1 fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 transition-all duration-300"'
            $content = $content -replace '<header>', '<header class="fixed top-0 left-0 w-full z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 transition-all duration-300">'
            
            # Agregar spacer después del </header> si no existe
            if ($content -notmatch '<!-- Spacer to prevent content') {
                $content = $content -replace '(</header>)', "$1`r`n    `r`n    <!-- Spacer to prevent content from going under fixed nav -->`r`n    <div class=`"h-16`"></div>"
            }
            
            $modified = $true
        }
        
        # Patrón 2: Cambiar absolute a fixed en headers
        if ($content -match '<header[^>]*\babsolute\b') {
            Write-Host "  → Cambiando absolute a fixed" -ForegroundColor Cyan
            $content = $content -replace '<header\s+class="([^"]*)\babsolute\b([^"]*)"', '<header class="$1fixed$2 bg-slate-900/95 backdrop-blur-md border-b border-slate-700 transition-all duration-300"'
            $modified = $true
        }
        
        if ($modified) {
            Set-Content -Path $filePath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "  ✓ Navbar sticky agregado exitosamente" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  - Ya tiene navbar sticky o no se pudo modificar" -ForegroundColor Gray
        }
        
    }
    catch {
        Write-Host "  ✗ Error: $_" -ForegroundColor Red
        $errorCount++
    }
    
    Write-Host ""
}

Write-Host "=== RESUMEN ===" -ForegroundColor Cyan
Write-Host "Páginas actualizadas: $successCount" -ForegroundColor Green
Write-Host "Errores: $errorCount" -ForegroundColor $(if ($errorCount -gt 0) { "Red" } else { "Gray" })
Write-Host ""
Write-Host "=== COMPLETADO ===" -ForegroundColor Cyan
