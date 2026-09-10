#!/bin/bash

echo "============================================="
echo " AUDITORIA DE EXECUÇÃO DE PROCESSOS NODE.JS"
echo "============================================="

echo -e "\n[1]Identificando todos os processos node.js ativos"
ps aux | grep node >> ./processos.log


echo -e "Resultado da Lista:"
sleep 2
cat processos.log
