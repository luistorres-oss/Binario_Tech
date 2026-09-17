#!/bin/bash

BASE_URL="http://localhost:3222/api/v1/prova"
EMAIL="teste$(date +%s)@email.com"
SENHA="123456"

echo "=============================================="
echo " TESTE DA AVALIAÇÃO - AULA 18"
echo "=============================================="

echo
echo "[1] REGISTRO"

REGISTER=$(curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$REGISTER" | jq .

echo
echo "[2] LOGIN"

LOGIN=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$LOGIN" | jq .

TOKEN=$(echo "$LOGIN" | jq -r '.token')

echo
echo "[3] TOKEN JWT"
echo "$TOKEN"

echo
echo "[4] ACESSANDO ROTA PROTEGIDA"

curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo
echo "[5] TESTANDO ACESSO SEM TOKEN"

curl -s -X GET "$BASE_URL/relatorio" | jq .

echo
echo "[6] TESTANDO TOKEN INVÁLIDO"

curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer token_invalido" | jq .

echo
echo "=============================================="
echo " FIM DOS TESTES"
echo "=============================================="
