#!/bin/bash

echo "======================================"
echo " ANALISE DE LOGS NGINX - STATUS 200"
echo "======================================"

tail -15 /var/log/nginx/access.log | grep " 200 "

echo "======================================"
