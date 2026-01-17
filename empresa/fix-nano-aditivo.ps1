$filePath = "c:/Users/benha/OneDrive/Desktop/ultra seco ecosistema/empresa/index.html"
$encoding = New-Object System.Text.UTF8Encoding $false

# Read all lines
$lines = [System.IO.File]::ReadAllLines($filePath, $encoding)

# Process each line
for ($i = 0; $i -lt $lines.Length; $i++) {
    # Change 1: Update image path for Nano Aditivo
    if ($lines[$i] -match 'src="images/aditivo\.png".*alt="Nano Aditivo"') {
        $lines[$i] = $lines[$i] -replace 'src="images/aditivo\.png"', 'src="images/nano-aditivo.jpg"'
        Write-Host "Changed image at line $($i+1)"
    }
    
    # Change 2: Update description
    if ($lines[$i] -match '>Aditivo para concreto de alto rendimiento\.<') {
        $lines[$i] = $lines[$i] -replace 'Aditivo para concreto de alto rendimiento\.', 'Aditivo nanotecnológico para concreto y morteros de alto rendimiento.'
        Write-Host "Changed description at line $($i+1)"
    }
    
    # Change 3: Update link (only for Nano Aditivo product card)
    if ($lines[$i] -match 'href="aditivo\.html"' -and $i -gt 460 -and $i -lt 490) {
        $lines[$i] = $lines[$i] -replace 'href="aditivo\.html"', 'href="nano-aditivo.html"'
        Write-Host "Changed link at line $($i+1)"
    }
}

# Write back
[System.IO.File]::WriteAllLines($filePath, $lines, $encoding)
Write-Host "All changes completed successfully!"
