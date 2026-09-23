@echo off
cd /d "%~dp0"
powershell -NoProfile -WindowStyle Hidden -Command "Start-Process node -ArgumentList 'server.js' -WindowStyle Hidden"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:4173/"
