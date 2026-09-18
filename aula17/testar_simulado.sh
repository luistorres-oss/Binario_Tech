#!/bin/bash

echo "============================"
echo "TESTE DE SIMULADO - AULA 17"
echo "============================"

echo -e "\n[1] Teste da rota /api/v1/health (Esperado HTTP 200)..."

curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3222/api/v1/health > health_check.log

echo "Resultado salvo em health_check.log"
