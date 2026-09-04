#!/bin/bash

echo "=========================================="
echo "  RESETANDO AMBIENTE DE TRABALHO..."
echo "=========================================="

# 1. Encerrar o processo Node.js
echo "[1/2] Parando processos Node.js..."
if pgrep -f "ocorrencias_api.js" > /dev/null; then
    pkill -f "ocorrencias_api.js"
    echo " -> Processo 'ocorrencias_api.js' finalizado."
elif pgrep -f "node" > /dev/null; then
    pkill -f "node"
    echo " -> Processo Node.js finalizado."
else
    echo " -> Nenhum processo Node.js em execução."
fi

# 2. Excluir o arquivo ocorrencias.json
echo "[2/2] Removendo 'ocorrencias.json'..."
if [ -f "ocorrencias.json" ]; then
    rm -f "ocorrencias.json"
    echo " -> Arquivo 'ocorrencias.json' removido."
else
    echo " -> Arquivo 'ocorrencias.json' não encontrado."
fi

echo "------------------------------------------"
echo " AMBIENTE RESETADO COM SUCESSO!"
echo "=========================================="
