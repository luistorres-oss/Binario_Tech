#!/bin/bash

API="http://localhost:3222/api/v1/veiculos"
LOG="crud_result.log"

echo "===== INICIO DOS TESTES CRUD =====" > "$LOG"
date >> "$LOG"

echo "Cadastrando o primeiro veiculo..." | tee -a "$LOG"

RESPOSTA1=$(curl -s -X POST "$API" \
-H "Content-Type: application/json" \
-d '{"placa":"VOL-1111","montadora":"Volvo","modelo":"FH 540"}')

echo "$RESPOSTA1" | jq . >> "$LOG"
ID1=$(echo "$RESPOSTA1" | jq -r '.id')

echo "Cadastrando o segundo veiculo..." | tee -a "$LOG"

RESPOSTA2=$(curl -s -X POST "$API" \
-H "Content-Type: application/json" \
-d '{"placa":"MER-2222","montadora":"Mercedes-Benz","modelo":"Actros"}')

echo "$RESPOSTA2" | jq . >> "$LOG"
ID2=$(echo "$RESPOSTA2" | jq -r '.id')

echo "Atualizando o primeiro veiculo..." | tee -a "$LOG"

curl -s -X PATCH "$API/$ID1/status" \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}' | jq . >> "$LOG"

echo "Excluindo o segundo veiculo..." | tee -a "$LOG"

curl -s -X DELETE "$API/$ID2" | jq . >> "$LOG"

echo "===== FIM DOS TESTES CRUD =====" | tee -a "$LOG"
echo "Consulte o arquivo crud_result.log para ver os resultados."
