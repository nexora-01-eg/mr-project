# launcher for all sites
$ErrorActionPreference = "SilentlyContinue"
Write-Host ""
Write-Host "Every site is starting on its own port:" -ForegroundColor Cyan
Write-Host "  Close this window or press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\elegance-womenswear-website\\dist","8081")
Start-Process "http://localhost:8081"
Write-Host "  elegance-womenswear-website  ->  http://localhost:8081" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\elegance-womenswear-website (1)\\dist","8082")
Start-Process "http://localhost:8082"
Write-Host "  elegance (1) - نسخة أحدث  ->  http://localhost:8082" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\fog-fashion-site\\dist","8083")
Start-Process "http://localhost:8083"
Write-Host "  fog-fashion-site  ->  http://localhost:8083" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\lanovia-brand-site\\dist","8084")
Start-Process "http://localhost:8084"
Write-Host "  lanovia-brand-site  ->  http://localhost:8084" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\massaya-mall-website\\dist","8085")
Start-Process "http://localhost:8085"
Write-Host "  massaya-mall-website  ->  http://localhost:8085" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\nexora-portfolio\\dist","8086")
Start-Process "http://localhost:8086"
Write-Host "  nexora-portfolio  ->  http://localhost:8086" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\delivery-saas-platform\\dist","8087")
Start-Process "http://localhost:8087"
Write-Host "  delivery-saas-platform  ->  http://localhost:8087" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\delivery-saas-platform-upgraded\\delivery-saas-platform\\dist","8088")
Start-Process "http://localhost:8088"
Write-Host "  delivery-saas-upgraded  ->  http://localhost:8088" -ForegroundColor Green
Start-Process -WindowStyle Hidden -FilePath "node" -ArgumentList @("D:\\مشاريع\\_server\\server.js","D:\\مشاريع\\مواقع ويب\\delivery-saas-platform-upgraded-demo\\delivery-saas-platform\\dist","8089")
Start-Process "http://localhost:8089"
Write-Host "  delivery-saas-upgraded-demo  ->  http://localhost:8089" -ForegroundColor Green
Write-Host ""
while ($true) { Start-Sleep -Seconds 3600 }