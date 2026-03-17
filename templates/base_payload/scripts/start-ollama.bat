@echo off
REM Start Ollama on custom port (11441) to avoid Windows reserved port conflict

echo Starting Ollama on port 11441...
echo (Port 11434 is reserved by Windows)
set OLLAMA_HOST=127.0.0.1:11441
ollama serve
