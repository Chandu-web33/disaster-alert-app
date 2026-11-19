# Apply Modern Theme to All HTML Files
Write-Host "🎨 Applying Modern UI/UX Theme..." -ForegroundColor Cyan

# Files to update
$files = @(
    "index.html",
    "login.html",
    "register.html",
    "dashboard.html",
    "admin-dashboard.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "📝 Updating $file..." -ForegroundColor Yellow
        
        # Read file content
        $content = Get-Content $file -Raw
        
        # Check if modern-theme.css is already included
        if ($content -notmatch 'modern-theme.css') {
            # Add modern-theme.css link before </head>
            $linkTag = '    <link rel="stylesheet" href="assets/css/modern-theme.css">'
            $content = $content -replace '</head>', "$linkTag`n</head>"
            
            # Save updated content
            Set-Content $file -Value $content -NoNewline
            
            Write-Host "   ✅ Added modern-theme.css to $file" -ForegroundColor Green
        } else {
            Write-Host "   ⏭️  Already has modern-theme.css" -ForegroundColor Gray
        }
    } else {
        Write-Host "   ⚠️  $file not found" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✨ Modern theme applied successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Restart frontend server"
Write-Host "   2. Clear browser cache (Ctrl+Shift+Delete)"
Write-Host "   3. Refresh page (Ctrl+F5)"
Write-Host ""
Write-Host "🎉 Enjoy your modern UI/UX!" -ForegroundColor Magenta
