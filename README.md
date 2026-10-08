# Binario_Tech
Binario Tech é o projeto da aula de programaçao back-end

Aula 03 - CLI, JSON, npm e Bash

Curso

Programação Back-End 1 (PBE1) - Consultoria Binário Tech

Data: 31/07/2026
Unidade: 1 - Ambiente de Desenvolvimento Web
Porta utilizada no projeto: "3222"

---

Objetivo da aula

Nesta aula foram utilizadas ferramentas de linha de comando para testar uma API, trabalhar com arquivos JSON e automatizar testes.

As principais ferramentas utilizadas foram:

- cURL → fazer requisições HTTP.
- HTTPie → fazer requisições HTTP de uma forma simples.
- jq → ler, organizar e filtrar dados JSON.
- npm → executar e gerenciar o projeto Node.js.
- Bash → criar e executar scripts.
- ps, grep e kill → localizar e encerrar processos.

A API foi desenvolvida utilizando Node.js e Express.

---

Exercício 01 - cURL + jq

O que o exercício pede?

Fazer uma requisição GET para a rota da Scania e mostrar somente o campo "modelo".

O que foi utilizado?

- "curl" → acessa a API.
- "jq" → seleciona somente o campo "modelo".

Comando utilizado

curl -s http://localhost:3222/api/v1/scania | jq '.modelo'

Explicação do comando

curl

Faz uma requisição para a API.

-s

Deixa a saída do "curl" mais limpa.

http://localhost:3222/api/v1/scania

É a rota da Scania.

|

Passa o resultado do "curl" para o "jq".

jq '.modelo'

Mostra somente o valor do campo "modelo".

Resultado esperado

"R450"

---

Exercício 02 - HTTPie + arquivo JSON

O que o exercício pede?

Fazer uma requisição para a rota da Mercedes usando HTTPie e salvar o resultado no arquivo "mercedes.json".

O que foi utilizado?

- "http" → comando do HTTPie.
- ">" → direciona o resultado para um arquivo.
- "mercedes.json" → arquivo onde a resposta será salva.

Comando utilizado

http http://localhost:3222/api/v1/mercedes > mercedes.json

Explicação

http

É o comando do HTTPie para fazer a requisição.

http://localhost:3222/api/v1/mercedes

É a rota da Mercedes.

>

Faz com que a resposta seja salva em um arquivo.

mercedes.json

É o arquivo que recebe os dados.

Para conferir o arquivo

cat mercedes.json

---

Exercício 03 - jq + arquivo JSON

O que o exercício pede?

Ler o arquivo "mercedes.json" e mostrar somente o valor do campo "status".

O que foi utilizado?

- "jq" → filtrar o JSON.
- "mercedes.json" → arquivo criado no exercício anterior.

Comando utilizado

jq '.status' mercedes.json

Resultado esperado

"OK"

Explicação

Neste exercício não é necessário usar "curl" ou "http", porque os dados já estão salvos no arquivo "mercedes.json".

O "jq '.status'" procura dentro do JSON somente o campo "status".

---

Exercício 04 - Nova rota da Volvo

O que o exercício pede?

Editar o arquivo "telemetria.js" e criar uma nova rota:

/api/v1/volvo

A rota deve retornar os dados do modelo FH 540.

O que foi utilizado?

- "nano" → editar o arquivo.
- Express → criar a nova rota.
- "curl" → testar a rota.
- "jq" → organizar o resultado.

Abrir o arquivo

nano telemetria.js

Rota adicionada

app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

Depois de salvar:

Ctrl + O → Enter → Ctrl + X

Iniciar novamente o servidor

npm start

Testar a nova rota

curl -s http://localhost:3222/api/v1/volvo | jq .

Explicação

Primeiro foi editado o arquivo da API para adicionar a rota da Volvo. Depois o servidor foi reiniciado e a rota foi testada usando "curl" e "jq".

---

Exercício 05 - npm start

O que o exercício pede?

Configurar o "package.json" para que a aplicação possa ser iniciada utilizando:

npm start

O que foi utilizado?

- "package.json" → arquivo de configuração do projeto.
- "npm" → executa o script.
- "node" → executa o arquivo "telemetria.js".

Configuração

No "package.json":

"scripts": {
    "start": "node telemetria.js"
}

Executar

npm start

Resultado

[Binario Tech] Servidor de Telemetria rodando em http://localhost:3222

Explicação

O "npm start" executa o comando definido dentro de ""scripts"" no "package.json".

Neste caso:

npm start
     ↓
node telemetria.js
     ↓
servidor iniciado na porta 3222

---

Exercício 06 - Criar relatório de log

O que o exercício pede?

Executar o script "testar_telemetria.sh" e salvar o resultado em um arquivo chamado "relatorio.log".

O que foi utilizado?

- Bash → executar o script.
- ">" → direcionar a saída.
- "relatorio.log" → armazenar o resultado.

Comando utilizado

./testar_telemetria.sh > relatorio.log

Para visualizar o relatório

cat relatorio.log

Explicação

O script normalmente mostra os resultados no terminal.

Com o símbolo ">", o resultado deixa de ser mostrado somente na tela e passa a ser salvo no arquivo:

relatorio.log

---

Exercício 07 - cURL + jq com dois campos

O que o exercício pede?

Acessar a rota da Volkswagen e mostrar somente:

- "montadora"
- "status"

O que foi utilizado?

- "curl" → acessar a API.
- "jq" → selecionar os campos desejados.

Comando utilizado

curl -s http://localhost:3222/api/v1/vw | jq '{montadora, status}'

Resultado esperado

{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}

Explicação

O "curl" pega todos os dados da rota.

O "jq" recebe esses dados e mostra somente os dois campos solicitados.

---

Exercício 08 - Encontrar e encerrar o processo Node.js

O que o exercício pede?

Localizar o processo Node.js em execução e encerrá-lo usando o PID.

O que foi utilizado?

- "ps aux" → mostra os processos em execução.
- "grep node" → procura os processos relacionados ao Node.js.
- "kill -9" → encerra o processo.

Primeiro comando

ps aux | grep node

Esse comando mostra os processos relacionados ao Node.js.

Será possível encontrar algo parecido com:

luis_torres   1234   ... node telemetria.js

O número:

1234

é o PID do processo.

Encerrar o processo

kill -9 1234

O número deve ser substituído pelo PID que apareceu no seu terminal.

Explicação

O PID é o número que identifica um processo no sistema.

O comando "kill -9" encerra esse processo.

---

Resumo dos exercícios

Exercício| Ferramentas utilizadas| Objetivo
01| "curl" + "jq"| Mostrar o modelo da Scania
02| "http" + ">"| Salvar resposta da Mercedes
03| "jq"| Filtrar o status da Mercedes
04| "nano" + Express + "curl" + "jq"| Criar e testar a rota Volvo
05| "npm" + "package.json"| Iniciar a API com "npm start"
06| Bash + ">"| Criar o relatório "relatorio.log"
07| "curl" + "jq"| Mostrar montadora e status da VW
08| "ps" + "grep" + "kill"| Localizar e encerrar o Node.js

---

Conclusão

Nesta aula, aprendi a utilizar ferramentas de linha de comando para trabalhar com uma API.

Aprendi a fazer requisições usando "curl" e HTTPie, filtrar informações JSON usando "jq", configurar o projeto para utilizar "npm start", criar scripts Bash e salvar seus resultados em arquivos de log.

Também aprendi a localizar um processo Node.js utilizando "ps" e "grep" e encerrá-lo através do seu PID com o comando "kill".

A porta utilizada no projeto foi a 3222.
