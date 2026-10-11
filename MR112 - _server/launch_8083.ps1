Start-Process -WindowStyle Hidden -FilePath "cmd.exe" -ArgumentList "/c", '"node "D:\مشاريع\_server\server.js" "D:\مشاريع\مواقع ويب\fog-fashion-site\dist" 8083"'
Start-Process "http://localhost:8083"