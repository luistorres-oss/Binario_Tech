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


# Aula 04 – Protocolo HTTP e API RESTful
## Binário Tech – Gerenciamento de Frotas

### 1. Objetivos da aula

Nesta aula, aprendi sobre o funcionamento do protocolo HTTP e como utilizar os principais métodos para trabalhar com uma API.

Os principais objetivos foram:

- Entender como funcionam as requisições e respostas HTTP.
- Conhecer os métodos GET, POST, PUT, PATCH e DELETE.
- Criar uma API utilizando Node.js e Express.
- Cadastrar, consultar, atualizar e excluir veículos.
- Utilizar códigos de status HTTP, como 200, 201, 400 e 404.
- Fazer testes no terminal usando cURL e jq.

### 2. Conceitos estudados

**HTTP:** protocolo utilizado para a comunicação entre clientes e servidores.

**Headers:** informações adicionais enviadas na requisição. Por exemplo, `Content-Type: application/json` informa que o conteúdo enviado está no formato JSON.

**Query Params:** parâmetros utilizados para filtrar informações. Exemplo: `?status=DISPONIVEL`.

**Body:** parte da requisição que contém os dados enviados, geralmente em formato JSON.

**Status Codes:** códigos que indicam o resultado da requisição.

| Código | Significado |
|---|---|
| 200 | Requisição realizada com sucesso. |
| 201 | Recurso criado com sucesso. |
| 400 | Requisição inválida ou dados obrigatórios ausentes. |
| 404 | Recurso não encontrado. |
| 500 | Erro interno do servidor. |

### 3. Diferença entre os métodos HTTP

- **GET:** consulta informações.
- **POST:** cadastra um novo recurso.
- **PUT:** substitui os dados de um recurso.
- **PATCH:** altera apenas uma parte dos dados.
- **DELETE:** remove um recurso.

### 4. Preparação do projeto

Primeiro, entrei na pasta do projeto e preparei o ambiente utilizando os seguintes comandos:

```bash
cd ~/curso-pbe1/binario_tech
mkdir -p aula04
cd aula04
npm init -y
npm install express
```

Depois, configurei o projeto para utilizar a porta 3222, seguindo o padrão das outras atividades.

Para configurar o comando de inicialização, executei:

```bash
npm pkg set scripts.start="node frota_api.js"
```

### 5. Código da API – frota_api.js

Criei o arquivo `frota_api.js` para gerenciar os veículos da Binário Tech.

Para criar ou editar o arquivo, utilizei:

```bash
nano frota_api.js
```

Código utilizado:

```javascript
const express = require('express');
const app = express();
const PORT = 3222;

app.use(express.json());

let veiculos = [
    {
        id: 1,
        placa: "ABC-1234",
        montadora: "Scania",
        modelo: "R450",
        status: "DISPONIVEL"
    },
    {
        id: 2,
        placa: "XYZ-9876",
        montadora: "Mercedes-Benz",
        modelo: "Actros",
        status: "EM_ROTA"
    }
];

// GET - Listar veículos e filtrar por status
app.get('/api/v1/veiculos', (req, res) => {
    const { status } = req.query;

    if (status) {
        const filtrados = veiculos.filter(
            v => v.status.toUpperCase() === status.toUpperCase()
        );

        return res.status(200).json(filtrados);
    }

    res.status(200).json(veiculos);
});

// GET - Buscar veículo por ID
app.get('/api/v1/veiculos/:id', (req, res) => {
    const id = Number(req.params.id);
    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    res.status(200).json(veiculo);
});

// POST - Cadastrar veículo
app.post('/api/v1/veiculos', (req, res) => {
    const { placa, montadora, modelo } = req.body;

    if (!placa || !montadora || !modelo) {
        return res.status(400).json({
            erro: "Placa, montadora e modelo sao obrigatorios."
        });
    }

    const novoVeiculo = {
        id: veiculos.length
            ? Math.max(...veiculos.map(v => v.id)) + 1
            : 1,
        placa,
        montadora,
        modelo,
        status: "DISPONIVEL"
    };

    veiculos.push(novoVeiculo);

    res.status(201).json(novoVeiculo);
});

// PATCH - Atualizar somente o status
app.patch('/api/v1/veiculos/:id/status', (req, res) => {
    const id = Number(req.params.id);
    const { status } = req.body;
    const veiculo = veiculos.find(v => v.id === id);

    if (!veiculo) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (typeof status !== 'string' || !status.trim()) {
        return res.status(400).json({
            erro: "O campo status e obrigatorio."
        });
    }

    veiculo.status = status.trim().toUpperCase();

    res.status(200).json({
        mensagem: "Status atualizado com sucesso!",
        veiculo
    });
});

// PUT - Substituir todos os dados do veículo
app.put('/api/v1/veiculos/:id', (req, res) => {
    const id = Number(req.params.id);
    const { placa, montadora, modelo, status } = req.body;
    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    if (
        typeof placa !== 'string' || !placa.trim() ||
        typeof montadora !== 'string' || !montadora.trim() ||
        typeof modelo !== 'string' || !modelo.trim() ||
        typeof status !== 'string' || !status.trim()
    ) {
        return res.status(400).json({
            erro: "Informe placa, montadora, modelo e status."
        });
    }

    const veiculoAtualizado = {
        id,
        placa: placa.trim(),
        montadora: montadora.trim(),
        modelo: modelo.trim(),
        status: status.trim().toUpperCase()
    };

    veiculos[index] = veiculoAtualizado;

    res.status(200).json({
        mensagem: "Veiculo substituido com sucesso!",
        veiculo: veiculoAtualizado
    });
});

// DELETE - Remover veículo
app.delete('/api/v1/veiculos/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = veiculos.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erro: "Veiculo nao encontrado."
        });
    }

    veiculos.splice(index, 1);

    res.status(200).json({
        mensagem: `Veiculo ID ${id} removido com sucesso.`
    });
});

app.listen(PORT, () => {
    console.log(
        `[Binario Tech] API rodando em http://localhost:${PORT}`
    );
});
```

**Explicação do código:**

- O Express foi utilizado para criar o servidor e as rotas.
- O `express.json()` permite receber dados enviados em JSON.
- A variável `veiculos` funciona como um banco de dados em memória.
- As rotas GET consultam os veículos.
- A rota POST cadastra novos veículos.
- A rota PATCH altera o status.
- A rota PUT substitui todos os dados do veículo.
- A rota DELETE remove um veículo.

Observação: como os dados ficam em memória, eles são perdidos quando o servidor é reiniciado.

### 6. Executando a API

Para iniciar o servidor, executei:

```bash
npm start
```

A mensagem esperada no terminal é:

```text
[Binario Tech] API rodando em http://localhost:3222
```

Deixei esse terminal aberto e utilizei outro terminal para executar os testes.

### 7. Testes das rotas HTTP

#### Teste 1 – Listar todos os veículos

```bash
curl -s http://localhost:3222/api/v1/veiculos | jq .
```

Resultado esperado: uma lista em JSON com os veículos cadastrados.

#### Teste 2 – Buscar veículo pelo ID

```bash
curl -i http://localhost:3222/api/v1/veiculos/1
```

Resultado esperado: HTTP 200 e os dados do veículo de ID 1.

#### Teste 3 – Cadastrar um veículo

```bash
curl -i -X POST http://localhost:3222/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"VWX-5555","montadora":"Volkswagen","modelo":"Delivery"}'
```

Resultado esperado: HTTP 201 Created e os dados do veículo cadastrado.

#### Teste 4 – Atualizar o status

```bash
curl -i -X PATCH http://localhost:3222/api/v1/veiculos/1/status \
-H "Content-Type: application/json" \
-d '{"status":"MANUTENCAO"}'
```

Resultado esperado: HTTP 200 e o status do veículo alterado para `MANUTENCAO`.

#### Teste 5 – Remover um veículo

```bash
curl -i -X DELETE http://localhost:3222/api/v1/veiculos/2
```

Resultado esperado: HTTP 200 e uma mensagem confirmando a remoção.

#### Teste 6 – Filtrar veículos disponíveis

```bash
curl -s "http://localhost:3222/api/v1/veiculos?status=DISPONIVEL" | jq .
```

Resultado esperado: somente os veículos com status `DISPONIVEL`.

### 8. Exercícios de fixação

#### Exercício 01 – Buscar veículo de ID 1

Comando:

```bash
curl -s http://localhost:3222/api/v1/veiculos/1 | jq .
```

O comando consulta o veículo de ID 1 e utiliza o jq para organizar a resposta JSON.

#### Exercício 02 – Cadastrar um caminhão Volvo

Comando:

```bash
curl -i -X POST http://localhost:3222/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}'
```

O resultado esperado é HTTP 201 Created.

#### Exercício 03 – Cadastrar sem a placa

Comando:

```bash
curl -i -X POST http://localhost:3222/api/v1/veiculos \
-H "Content-Type: application/json" \
-d '{"montadora":"Volvo","modelo":"FH 540"}'
```

Resultado esperado:

```json
{
  "erro": "Placa, montadora e modelo sao obrigatorios."
}
```

O status HTTP deve ser 400 Bad Request.

#### Exercício 04 – Filtrar por status

Comando:

```bash
curl -s "http://localhost:3222/api/v1/veiculos?status=DISPONIVEL" | jq .
```

Esse comando utiliza um Query Param para filtrar os veículos disponíveis.

#### Exercício 05 – Atualizar o veículo de ID 3

Comando:

```bash
curl -i -X PATCH http://localhost:3222/api/v1/veiculos/3/status \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}'
```

Se o veículo de ID 3 existir, a API retornará HTTP 200 e atualizará seu status.

#### Exercício 06 – Testar um ID inexistente

Para testar a atualização:

```bash
curl -i -X PATCH http://localhost:3222/api/v1/veiculos/99/status \
-H "Content-Type: application/json" \
-d '{"status":"EM_ROTA"}'
```

Para testar a exclusão:

```bash
curl -i -X DELETE http://localhost:3222/api/v1/veiculos/99
```

Resultado esperado: HTTP 404 Not Found.

#### Exercício 07 – Substituir todos os dados com PUT

Comando:

```bash
curl -i -X PUT http://localhost:3222/api/v1/veiculos/1 \
-H "Content-Type: application/json" \
-d '{"placa":"ABC-1234","montadora":"Scania","modelo":"R500","status":"DISPONIVEL"}'
```

A rota PUT foi adicionada ao arquivo `frota_api.js`. Ela recebe todos os campos, substitui os dados do veículo e mantém o mesmo ID.

#### Exercício 08 – Criar o script teste_crud.sh

Criei um script para cadastrar dois veículos, atualizar um deles, excluir o outro e registrar os resultados em um arquivo de log.

Para criar o arquivo:

```bash
nano teste_crud.sh
```

Código do script:

```bash
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
```

Salvei o arquivo e dei permissão de execução:

```bash
chmod +x teste_crud.sh
```

Executei o script com:

```bash
./teste_crud.sh
```

Para visualizar os registros:

```bash
cat crud_result.log
```

O arquivo `crud_result.log` registra as respostas das operações executadas pelo script. Para conferir os códigos HTTP de cada operação, seria necessário registrar também os status das respostas no script.

### 9. Comandos úteis para a atividade

Verificar a versão do Node.js:

```bash
node -v
```

Verificar a versão do npm:

```bash
npm -v
```

Verificar os arquivos da pasta:

```bash
ls
```

Visualizar o conteúdo do arquivo:

```bash
cat frota_api.js
```

Testar se a API está respondendo:

```bash
curl -i http://localhost:3222/api/v1/veiculos
```

### 10. Conclusão

Com essa aula, aprendi como funciona o protocolo HTTP e como utilizar seus principais métodos em uma API RESTful. Também pratiquei o envio de dados em JSON, a utilização de parâmetros de consulta e o tratamento de erros com códigos HTTP.

A atividade ajudou a entender como uma API pode ser utilizada para cadastrar, consultar, atualizar e excluir veículos de uma frota. Além disso, pratiquei comandos do terminal com cURL, jq e Bash para automatizar os testes.

### 11. O que posso falar na apresentação

Nesta aula, desenvolvi uma API de gerenciamento de frotas utilizando Node.js e Express. Implementei as operações CRUD e aprendi a diferença entre PUT e PATCH. Também fiz testes utilizando cURL, validei os dados enviados e verifiquei os códigos de resposta HTTP. Por último, criei um script Bash para automatizar algumas operações e salvar os resultados em um arquivo de log.
http://localhost:3222/api/v1
```
