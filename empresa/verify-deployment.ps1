# Pre-Deployment Verification for Ultra Seco
Write-Host "========================================"
Write-Host "Ultra Seco Pre-Deployment Check"
Write-Host "========================================"
Write-Host ""

$errors = 0
$warnings = 0

# Check required HTML files
Write-Host "Checking HTML files..."
if (Test-Path "index.html") {
    Write-Host "[OK] index.html" -ForegroundColor Green
}
else {
    Write-Host "[ERROR] index.html MISSING" -ForegroundColor Red
    $errors++
}

# Check CSS/JS files
Write-Host "`nChecking CSS/JS files..."
$requiredFiles = @("styles.css", "script.js", "catalog.js", "shopify-integration.js")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "[OK] $file" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] $file MISSING" -ForegroundColor Red
        $errors++
    }
}

# Check directories
Write-Host "`nChecking directories..."
$requiredDirs = @("images", "assets", "docs", "logo")
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        $count = (Get-ChildItem $dir -File -ErrorAction SilentlyContinue).Count
        Write-Host "[OK] $dir/ ($count files)" -ForegroundColor Green
    }
    else {
        Write-Host "[ERROR] $dir/ MISSING" -ForegroundColor Red
        $errors++
    }
}

# Check Shopify configuration
Write-Host "`nChecking Shopify configuration..."
if (Test-Path "shopify-integration.js") {
    $content = Get-Content "shopify-integration.js" -Raw
    if ($content -match "cx0msw-x8") {
        Write-Host "[OK] Shopify domain configured" -ForegroundColor Green
    }
    else {
        Write-Host "[WARNING] Check Shopify domain" -ForegroundColor Yellow
        $warnings++
    }
}

# Summary
Write-Host "`n========================================"
Write-Host "Summary"
Write-Host "========================================"
Write-Host "Errors: $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
Write-Host "Warnings: $warnings" -ForegroundColor $(if ($warnings -eq 0) { "Green" } else { "Yellow" })

if ($errors -eq 0) {
    Write-Host "`n[SUCCESS] Ready for deployment!" -ForegroundColor Green
}
else {
    Write-Host "`n[FAILED] Fix errors before deployment!" -ForegroundColor Red
}

