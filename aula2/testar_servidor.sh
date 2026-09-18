#!/bin/bash

# Endereço base do servidor
BASE_URL="http://localhost:8080"

# Lista das rotas para teste
ROTAS=("/status" "/scania/info" "/vw/info")

for ROTA in "${ROTAS[@]}"; do
  echo "========================================"
  echo "Horário do teste: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "Requisitando: ${BASE_URL}${ROTA}"
  echo "========================================"
  curl -i -s "${BASE_URL}${ROTA}"
  echo -e "\n"
done
