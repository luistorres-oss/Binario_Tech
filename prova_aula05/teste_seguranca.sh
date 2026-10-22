#!/bin/bash

LOG_FILE="audit_seguranca.log"
URL="http://localhost:3222/api/v1/motoristas"
API_KEY="binario-tech-secret-2026"

echo "=== AUDITORIA DE SEGURANCA ===" > "$LOG_FILE"
echo "Data: $(date)" >> "$LOG_FILE"

for tentativa in 1 2 3; do
    echo "Tentativa $tentativa - Sem API Key" >> "$LOG_FILE"

    curl -s -o /dev/null \
    -w "HTTP Status: %{http_code}\n" \
    "$URL" >> "$LOG_FILE"
done

echo "Tentativa 4 - Com API Key valida" >> "$LOG_FILE"

curl -s -o /dev/null \
-w "HTTP Status: %{http_code}\n" \
-H "X-API-KEY: $API_KEY" \
"$URL" >> "$LOG_FILE"

echo "Auditoria concluida."
