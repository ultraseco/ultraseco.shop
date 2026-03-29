# Ultra F3 Portable Generator (Fixed Audio & Mobile)
$ErrorActionPreference = "Stop"

$baseDir = $PSScriptRoot
$inputFile = Join-Path $baseDir "f3.html"
$outputFile = Join-Path $baseDir "f3_portable.html"

Write-Host "Iniciando Generador (Audio Fixed)..." -ForegroundColor Cyan

# 1. Leer HTML
if (-not (Test-Path $inputFile)) {
    Write-Error "No se encuentra f3.html"
}
$html = Get-Content $inputFile -Raw -Encoding UTF8

function Download-Resource {
    param($url)
    try {
        Write-Host "Descargando: $url" -ForegroundColor Gray
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing
        return $response.Content
    }
    catch {
        Write-Warning "Fallo descarga de $url"
        return "/* Error descargando $url */"
    }
}

function Get-Base64-Asset {
    param($path)
    try {
        if (Test-Path $path) {
            $bytes = [System.IO.File]::ReadAllBytes($path)
            $b64 = [Convert]::ToBase64String($bytes)
            $ext = [System.IO.Path]::GetExtension($path).TrimStart('.').ToLower()
            
            # Handling Images
            if ($ext -eq "jpg" -or $ext -eq "jpeg") { 
                return "data:image/jpeg;base64," + $b64 
            }
            if ($ext -eq "png") { 
                return "data:image/png;base64," + $b64 
            }
            if ($ext -eq "svg") { 
                return "data:image/svg+xml;base64," + $b64 
            }
            
            # Handling Audio - THIS FIXES THE AUDIO ISSUE
            if ($ext -eq "mp3") {
                return "data:audio/mpeg;base64," + $b64
            }
            if ($ext -eq "wav") {
                return "data:audio/wav;base64," + $b64
            }

            return "data:application/octet-stream;base64," + $b64
        }
    }
    catch {
        Write-Warning "Error leyendo asset: $path"
    }
    return $null
}

# 2. Reemplazar CDN References
Write-Host "Embebiendo librerias..." -ForegroundColor Yellow

# Tailwind
$val = Download-Resource "https://cdn.tailwindcss.com"
$html = $html.Replace('<script src="https://cdn.tailwindcss.com"></script>', "<script>$val</script>")

# Font Awesome
$val = Download-Resource "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
$html = $html.Replace('<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">', "<style>$val</style>")

# Chart.js
$val = Download-Resource "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
$html = $html.Replace('<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>', "<script>$val</script>")

# jsPDF
$val = Download-Resource "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
$html = $html.Replace('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>', "<script>$val</script>")

# Google Fonts
$html = $html.Replace('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">', '<style>@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap");</style>')

# 3. Embeber Assets Locales (Imágenes y Audio)
Write-Host "Procesando imágenes y audio..." -ForegroundColor Yellow

$pattern = 'src=["'']([^"'']+)["'']'
$matches = [regex]::Matches($html, $pattern)

foreach ($match in $matches) {
    if ($match.Success) {
        $relativePath = $match.Groups[1].Value
        
        # Skip external or data URIs
        if ($relativePath.StartsWith("http") -or $relativePath.StartsWith("data:") -or $relativePath.StartsWith("//")) {
            continue
        }

        # Resolve path - Handle "../" which means go up one level
        # $baseDir is in "empresa". "../productos" is "ultra seco ecosistema/productos"
        # We need to construct the absolute path carefully.
        
        $assetPath = $relativePath.Replace('/', '\')
        $fullPath = $null
        
        if ($assetPath.StartsWith("..\")) {
            # Start from parent of baseDir
            $parentDir = (Get-Item $baseDir).Parent.FullName
            $remaining = $assetPath.Substring(3)
            $fullPath = Join-Path $parentDir $remaining
        }
        else {
            $fullPath = Join-Path $baseDir $assetPath
        }

        Write-Host "Asset: $relativePath -> " -NoNewline
        
        if (Test-Path $fullPath) {
            $b64Data = Get-Base64-Asset $fullPath
            if ($b64Data) {
                $original = $match.Value
                $replacement = 'src="' + $b64Data + '"'
                # Reemplazo seguro (solo la ocurrencia exacta, aunque Replace reemplaza todas...
                # en este caso está bien porque las rutas son uniques o si repiten son el mismo recurso)
                $html = $html.Replace($original, $replacement)
                Write-Host "OK (Base64)" -ForegroundColor Green
            }
            else {
                Write-Host "ERROR (Conversion)" -ForegroundColor Red
            }
        }
        else {
            Write-Host "NO ENCONTRADO ($fullPath)" -ForegroundColor Red
        }
    }
}

# 4. Background Image
$heroPath = Join-Path $baseDir "assets\hero-f3.jpg"
if (Test-Path $heroPath) {
    Write-Host "Background Hero..." -NoNewline
    $b64Hero = Get-Base64-Asset $heroPath
    if ($b64Hero) {
        # Check if URL was already data replaced? No, CSS url() is different pattern
        $html = $html.Replace("url('assets/hero-f3.jpg')", "url('$b64Hero')")
        Write-Host " OK" -ForegroundColor Green
    }
}

# 5. Guardar
$html | Set-Content $outputFile -Encoding UTF8
Write-Host "FINALIZADO: $outputFile" -ForegroundColor Cyan
