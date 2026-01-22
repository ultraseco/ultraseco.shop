# Script de Corrección Automática - Ecosistema Ultra Seco
# Fecha: 2026-01-09

Write-Host "=== INICIANDO CORRECCIONES DEL ECOSISTEMA ===" -ForegroundColor Cyan
Write-Host ""

$docsPath = "c:\Users\benha\OneDrive\Desktop\ultra seco ecosistema\empresa\docs"
$fichasTecnicas = Get-ChildItem -Path $docsPath -Filter "*ficha-tecnica.html"

Write-Host "Archivos a procesar: $($fichasTecnicas.Count)" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $fichasTecnicas) {
    Write-Host "Procesando: $($file.Name)" -ForegroundColor Green
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # 1. Reemplazar botón "Volver" con history.back()
    if ($content -match '<a href="\.\.\/.*?\.html"([^>]*)>\s*Volver\s*</a>') {
        Write-Host "  ✓ Corrigiendo botón Volver..." -ForegroundColor Cyan
        $content = $content -replace '<a href="\.\.\/.*?\.html"\s+class="([^"]*)">\s*Volver\s*</a>', 
            '<button onclick="window.history.back()" class="$1"><i class="fas fa-arrow-left mr-2"></i>Volver</button>'
        $modified = $true
    }
    
    # 2. Mejorar contraste de textos
    # text-gray-400 → text-gray-600
    if ($content -match 'text-gray-400') {
        Write-Host "  ✓ Mejorando contraste text-gray-400..." -ForegroundColor Cyan
        $content = $content -replace 'text-gray-400', 'text-gray-600'
        $modified = $true
    }
    
    # text-slate-400 → text-slate-600
    if ($content -match 'text-slate-400') {
        Write-Host "  ✓ Mejorando contraste text-slate-400..." -ForegroundColor Cyan
        $content = $content -replace 'text-slate-400', 'text-slate-600'
        $modified = $true
    }
    
    # text-yellow-400 sobre fondos claros → text-yellow-600
    if ($content -match 'text-yellow-400') {
        Write-Host "  ✓ Mejorando contraste text-yellow-400..." -ForegroundColor Cyan
        $content = $content -replace 'text-yellow-400', 'text-yellow-600'
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Archivo actualizado" -ForegroundColor Green
    } else {
        Write-Host "  - Sin cambios necesarios" -ForegroundColor Gray
    }
    
    Write-Host ""
}

Write-Host "=== CORRECCIONES COMPLETADAS ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Siguiente paso: Revisar manualmente las páginas principales" -ForegroundColor Yellow
