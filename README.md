# Binario_Tech
Binario Tech é o projeto da aula de programaçao back-end

# Aula 03 — CLI, JSON, npm e Bash

## 1. Objetivos da aula

Nesta aula foram trabalhados os seguintes assuntos:

* Utilizar `curl` para fazer requisições HTTP.
* Utilizar `httpie` para testar APIs.
* Utilizar `jq` para visualizar e filtrar dados JSON.
* Diferenciar `apt` e `npm`.
* Criar uma API simples utilizando Node.js e Express.
* Criar scripts Bash para automatizar testes.
* Trabalhar com processos do Node.js usando `ps` e `kill`.
* Salvar resultados de comandos em arquivos de log.

---

# 2. Preparação do ambiente

Primeiro, entre na pasta do projeto:

```bash
cd ~/curso-pbe1/binario_tech
```

Entre na pasta da Aula 03:

```bash
cd aula03
```

Caso a pasta ainda não exista:

```bash
mkdir -p aula03
cd aula03
```

Inicialize o projeto Node.js:

```bash
npm init -y
```

Instale o Express:

```bash
npm install express
```

Instale o `jq` e o `httpie`:

```bash
sudo apt-get update
sudo apt-get install -y jq httpie
```

### Diferença entre apt e npm

`apt` é utilizado para instalar programas no sistema operacional.

Exemplo:

```bash
sudo apt-get install jq
```

`npm` é utilizado para instalar pacotes e dependências de projetos Node.js.

Exemplo:

```bash
npm install express
```

---

# 3. Criando a API de Telemetria

## Arquivo utilizado

O arquivo principal será:

```text
aula03/telemetria.js
```

Para criar ou editar o arquivo:

```bash
nano telemetria.js
```

Cole o seguinte código:

```javascript
const express = require('express');

const app = express();

const PORT = 3222;

app.use(express.json());

// Rota Scania
app.get('/api/v1/scania', (req, res) => {
    res.json({
        montadora: "Scania",
        modelo: "R450",
        status: "OK",
        conexao: true,
        velocidade_media: 82
    });
});

// Rota Mercedes-Benz
app.get('/api/v1/mercedes', (req, res) => {
    res.json({
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "OK",
        conexao: true,
        velocidade_media: 78
    });
});

// Rota Volkswagen
app.get('/api/v1/vw', (req, res) => {
    res.json({
        montadora: "Volkswagen",
        modelo: "Delivery",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

// Rota Volvo
app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

app.listen(PORT, () => {
    console.log(
        `[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`
    );
});
```

Para salvar no `nano`:

```text
Ctrl + O
Enter
Ctrl + X
```

---

# 4. Executando o servidor

Execute:

```bash
node telemetria.js
```

O terminal deverá mostrar algo parecido com:

```text
[Binario Tech] Servidor de Telemetria rodando em http://localhost:3222
```

Se quiser deixar o servidor rodando em segundo plano:

```bash
node telemetria.js &
```

---

# 5. Criando o script Bash

## Arquivo

O arquivo será:

```text
aula03/testar_telemetria.sh
```

Crie o arquivo:

```bash
nano testar_telemetria.sh
```

Cole:

```bash
#!/bin/bash

echo "========================================="
echo "  AUDITORIA DE TELEMETRIA - BINARIO TECH "
echo "  Data/Hora: $(date)"
echo "========================================="

echo -e "\n[1] Testando Rota Scania..."
curl -s http://localhost:3222/api/v1/scania | jq .

echo -e "\n[2] Testando Rota Mercedes-Benz..."
curl -s http://localhost:3222/api/v1/mercedes | jq .

echo -e "\n[3] Testando Rota Volkswagen..."
curl -s http://localhost:3222/api/v1/vw | jq .

echo -e "\n-----------------------------------------"
echo "Auditoria finalizada com sucesso!"
```

Salve:

```text
Ctrl + O
Enter
Ctrl + X
```

Dê permissão de execução:

```bash
chmod +x testar_telemetria.sh
```

Execute:

```bash
./testar_telemetria.sh
```

---

# 6. Exercício 01 — Utilizando curl e jq

## Objetivo

Fazer uma requisição para a rota da Scania e mostrar somente o campo `modelo`.

### Comando:

```bash
curl -s http://localhost:3222/api/v1/scania | jq '.modelo'
```

### Resultado esperado:

```text
"R450"
```

### O que foi utilizado?

`curl` faz a requisição para a API.

`jq '.modelo'` pega somente o campo `modelo`.

---

# 7. Exercício 02 — Utilizando HTTPie

## Objetivo

Fazer uma requisição para a rota Mercedes-Benz usando `httpie` e salvar o resultado em `mercedes.json`.

### Comando:

```bash
http http://localhost:3222/api/v1/mercedes > mercedes.json
```

O arquivo será criado:

```text
mercedes.json
```

Para conferir:

```bash
cat mercedes.json
```

Ou:

```bash
cat mercedes.json | jq .
```

---

# 8. Exercício 03 — Filtrando o arquivo JSON

## Objetivo

Ler o arquivo `mercedes.json` e mostrar somente o campo `status`.

### Comando:

```bash
jq '.status' mercedes.json
```

### Resultado esperado:

```text
"OK"
```

Aqui o `jq` está lendo diretamente o arquivo JSON.

---

# 9. Exercício 04 — Criando a rota Volvo

## Objetivo

Adicionar uma nova rota:

```text
/api/v1/volvo
```

O modelo será:

```text
FH 540
```

## Arquivo alterado

```text
telemetria.js
```

Adicione:

```javascript
app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});
```

Depois salve o arquivo.

### Reinicie o servidor

Primeiro encontre o processo:

```bash
ps aux | grep node
```

Encerre o processo usando o PID encontrado:

```bash
kill -9 PID
```

Exemplo:

```bash
kill -9 1234
```

Depois execute novamente:

```bash
node telemetria.js
```

### Teste a nova rota:

```bash
curl -s http://localhost:3222/api/v1/volvo | jq .
```

Também pode testar somente o modelo:

```bash
curl -s http://localhost:3222/api/v1/volvo | jq '.modelo'
```

Resultado:

```text
"FH 540"
```

---

# 10. Exercício 05 — Criando o comando npm start

## Objetivo

Adicionar um comando para iniciar a aplicação usando:

```bash
npm start
```

## Arquivo alterado

```text
package.json
```

Abra:

```bash
nano package.json
```

Procure:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

Altere para:

```json
"scripts": {
  "start": "node telemetria.js"
}
```

O `package.json` deverá ficar parecido com:

```json
{
  "name": "aula03",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node telemetria.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

Salve:

```text
Ctrl + O
Enter
Ctrl + X
```

### Teste:

```bash
npm start
```

Resultado esperado:

```text
[Binario Tech] Servidor de Telemetria rodando em http://localhost:3222
```

---

# 11. Exercício 06 — Criando um arquivo de log

## Objetivo

Executar o script de auditoria e salvar toda a saída em:

```text
relatorio.log
```

### Comando:

```bash
./testar_telemetria.sh > relatorio.log
```

Para visualizar:

```bash
cat relatorio.log
```

Também podemos usar `tee` para mostrar no terminal e salvar ao mesmo tempo:

```bash
./testar_telemetria.sh | tee relatorio.log
```

O arquivo criado será:

```text
relatorio.log
```

---

# 12. Exercício 07 — Filtrando dois campos com jq

## Objetivo

Mostrar somente:

```text
montadora
status
```

da rota Volkswagen.

### Comando:

```bash
curl -s http://localhost:3222/api/v1/vw | jq '{montadora, status}'
```

### Resultado esperado:

```json
{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}
```

Neste exercício usamos apenas uma chamada do `jq` para pegar os dois campos.

---

# 13. Exercício 08 — Encontrando e encerrando o processo Node.js

## Objetivo

Localizar o processo Node.js que está executando a API.

### Primeiro:

```bash
ps aux | grep node
```

Será mostrado algo parecido com:

```text
user    1234  ... node telemetria.js
```

O número:

```text
1234
```

é o PID do processo.

### Encerrar o processo:

```bash
kill -9 1234
```

Troque `1234` pelo PID que apareceu no seu terminal.

### Conferir novamente:

```bash
ps aux | grep node
```

O processo `telemetria.js` deverá ter sido encerrado.

---

# 14. Resumo dos principais comandos

## Entrar na aula

```bash
cd ~/curso-pbe1/binario_tech/aula03
```

## Iniciar a API

```bash
node telemetria.js
```

ou:

```bash
npm start
```

## Testar Scania

```bash
curl -s http://localhost:3222/api/v1/scania | jq .
```

## Mostrar somente o modelo da Scania

```bash
curl -s http://localhost:3222/api/v1/scania | jq '.modelo'
```

## Testar Mercedes com HTTPie

```bash
http http://localhost:3222/api/v1/mercedes
```

## Salvar Mercedes em arquivo

```bash
http http://localhost:3222/api/v1/mercedes > mercedes.json
```

## Ler o status do arquivo

```bash
jq '.status' mercedes.json
```

## Testar Volkswagen

```bash
curl -s http://localhost:3222/api/v1/vw | jq .
```

## Mostrar somente montadora e status

```bash
curl -s http://localhost:3222/api/v1/vw | jq '{montadora, status}'
```

## Testar Volvo

```bash
curl -s http://localhost:3222/api/v1/volvo | jq .
```

## Executar o script Bash

```bash
./testar_telemetria.sh
```

## Salvar auditoria em log

```bash
./testar_telemetria.sh > relatorio.log
```

## Mostrar e salvar ao mesmo tempo

```bash
./testar_telemetria.sh | tee relatorio.log
```

## Ver processos Node.js

```bash
ps aux | grep node
```

## Encerrar processo

```bash
kill -9 PID
```

---

# 15. Arquivos criados na Aula 03

Ao final da aula, a pasta deverá conter arquivos parecidos com:

```text
aula03/
├── node_modules/
├── package-lock.json
├── package.json
├── telemetria.js
├── testar_telemetria.sh
├── mercedes.json
└── relatorio.log
```

## Função de cada arquivo

### `telemetria.js`

É o servidor da API de telemetria.

### `testar_telemetria.sh`

É o script Bash utilizado para automatizar os testes das rotas.

### `package.json`

Guarda as informações do projeto e os comandos do npm.

### `package-lock.json`

Registra as versões das dependências instaladas.

### `mercedes.json`

Guarda a resposta da rota Mercedes.

### `relatorio.log`

Guarda o resultado da auditoria executada pelo script.

### `node_modules/`

Contém as dependências instaladas pelo npm, como o Express.

---

# 16. Conclusão

Nesta aula foram praticados comandos de terminal para trabalhar com APIs.

O `curl` foi utilizado para fazer requisições HTTP.

O `httpie` foi utilizado como uma alternativa ao `curl`, apresentando uma sintaxe mais simples para algumas requisições.

O `jq` foi utilizado para trabalhar com os dados JSON, permitindo selecionar somente os campos necessários.

O `npm` foi utilizado para gerenciar as dependências do projeto Node.js.

Também foi criado um script Bash para automatizar os testes das rotas de telemetria.

Por fim, foram utilizados `ps` e `kill` para localizar e encerrar processos Node.js.

A API foi configurada para funcionar na porta:

```text
3222
```

Base das rotas:

```text
http://localhost:3222/api/v1
```
