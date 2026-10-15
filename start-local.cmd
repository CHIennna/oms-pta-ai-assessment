@echo off
cd /d "%~dp0"
powershell -NoProfile -WindowStyle Hidden -Command "$ErrorActionPreference='Stop'; $env:PORT='4176'; if(-not (Get-NetTCPConnection -LocalPort 4176 -State Listen -ErrorAction SilentlyContinue)){Start-Process -FilePath (Get-Command node -ErrorAction Stop).Source -ArgumentList 'server.js' -WorkingDirectory (Get-Location).Path -WindowStyle Hidden}"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:4176/"
