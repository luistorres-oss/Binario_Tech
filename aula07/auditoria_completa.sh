#!/bin/bash

# Define o arquivo de saída
LOG_FILE="auditoria.log"

# Grava o cabeçalho no arquivo de log
echo "==========================================" > "$LOG_FILE"
echo " AUDITORIA COMPLETA DE FROTAS - BINÁRIO TECH" >> "$LOG_FILE"
echo " Data do Teste: $(date)" >> "$LOG_FILE"
echo "==========================================" >> "$LOG_FILE"
echo -e "\n" >> "$LOG_FILE"

# 1. Requisição para o endpoint da Scania
echo "[1] Auditando Telemetria Scania..." >> "$LOG_FILE"
curl -s http://localhost:3000/api/v1/telemetria/scania | jq . >> "$LOG_FILE"
echo -e "\n------------------------------------------\n" >> "$LOG_FILE"

# 2. Requisição para o endpoint da Mercedes-Benz
echo "[2] Auditando Telemetria Mercedes-Benz..." >> "$LOG_FILE"
curl -s http://localhost:3000/api/v1/telemetria/mercedes | jq . >> "$LOG_FILE"
echo -e "\n------------------------------------------\n" >> "$LOG_FILE"

# Mensagem de confirmação no terminal
echo "Auditoria executada com sucesso! O relatório foi salvo em: $LOG_FILE"
