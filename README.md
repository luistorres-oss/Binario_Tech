# Binario_Tech
Binario Tech é o projeto da aula de programaçao back-end

Aula 03 - CLI, JSON, npm e Bash
Curso

Programação Back-End 1 (PBE1) - Consultoria Binário Tech

Data: 31/07/2026
Unidade: 1 - Ambiente de Desenvolvimento Web

Objetivo da aula

Nesta aula, aprendi a utilizar ferramentas pelo terminal para testar APIs, trabalhar com arquivos JSON e automatizar testes.

As principais ferramentas utilizadas foram:

curl para fazer requisições HTTP;
httpie para testar rotas;
jq para organizar e filtrar dados JSON;
npm para gerenciar pacotes do Node.js;
apt para instalar programas no sistema;
Bash para criar scripts de automação.

Também foi criada uma API de telemetria utilizando Node.js e Express.

Exercícios
Exercício 01 - Usando cURL e jq

O objetivo foi fazer uma requisição GET para a rota da Scania e mostrar somente o modelo do veículo.

Comando utilizado:
curl -s http://localhost:3001/api/v1/scania | jq '.modelo'
Resultado esperado:
"R450"
O que foi feito?

Usei o curl para acessar a rota da Scania e o jq para mostrar somente o valor da chave modelo.

Exercício 02 - Utilizando HTTPie

Neste exercício, foi utilizada a ferramenta httpie para acessar a rota da Mercedes-Benz e salvar o resultado no arquivo mercedes.json.

Comando:
http http://localhost:3001/api/v1/mercedes > mercedes.json
O que foi feito?

A resposta da API foi direcionada para o arquivo mercedes.json.

Esse arquivo pode ser conferido com:

cat mercedes.json

Exercício 03 - Filtrando JSON com jq

Neste exercício, utilizei o jq para abrir o arquivo mercedes.json e mostrar somente o campo status.

Comando:
jq '.status' mercedes.json
Resultado esperado:
"OK"
O que foi feito?

O jq foi usado para pegar somente o valor da chave status dentro do arquivo JSON.

Exercício 04 - Criando a rota da Volvo

Foi necessário editar o arquivo:

telemetria.js

E adicionar a rota:

/api/v1/volvo

Com os dados do modelo FH 540.

Código adicionado:
app.get('/api/v1/volvo', (req, res) => {
    res.json({
        montadora: "Volvo",
        modelo: "FH 540",
        status: "ALERTA",
        conexao: false,
        velocidade_media: 0
    });
});

Depois de salvar o arquivo, foi necessário reiniciar o servidor.

Teste:
curl -s http://localhost:3001/api/v1/volvo | jq .
O que foi feito?

Foi criada uma nova rota para consultar os dados de telemetria de um veículo Volvo FH 540.

Exercício 05 - Configurando o npm start

Neste exercício, o arquivo package.json foi configurado para iniciar o servidor usando:

npm start

Foi adicionado o script:

"scripts": {
    "start": "node telemetria.js"
}
Comando utilizado:
npm start
O que foi feito?

Em vez de executar diretamente:

node telemetria.js

Agora o servidor também pode ser iniciado utilizando:
npm start

Exercício 06 - Criando um arquivo de relatório

O objetivo foi salvar o resultado da auditoria feita pelo script testar_telemetria.sh em um arquivo chamado:

relatorio.log
Comando:
./testar_telemetria.sh > relatorio.log

Para visualizar o relatório:

cat relatorio.log
O que foi feito?

O símbolo > direciona a saída do script para o arquivo relatorio.log.

Assim, os resultados da auditoria ficam salvos para consultar depois.

Exercício 07 - Filtrando dois campos com jq

Neste exercício, foi utilizada uma única chamada do jq para mostrar somente os campos montadora e status da rota Volkswagen.

Comando:
curl -s http://localhost:3001/api/v1/vw | jq '{montadora, status}'
Resultado esperado:
{
  "montadora": "Volkswagen",
  "status": "ALERTA"
}
O que foi feito?

O jq foi usado para selecionar somente os dois campos solicitados, sem mostrar o restante das informações.

Exercício 08 - Localizando e encerrando o processo Node.js

Primeiro, foi utilizado o comando para encontrar o processo Node.js:

ps aux | grep node

O comando mostra os processos relacionados ao Node.js e seus respectivos PID, que é o número de identificação do processo.

Depois de encontrar o PID correto, foi utilizado:

kill -9 <PID>

Por exemplo:

kill -9 1234
O que foi feito?

O processo Node.js que estava executando o servidor foi localizado e encerrado utilizando o seu PID.

Conclusão

Nesta aula, aprendi a utilizar ferramentas do terminal para trabalhar com APIs e arquivos JSON.

Também aprendi a usar curl, httpie e jq, além de criar um script Bash para automatizar testes. Por fim, aprendi como iniciar uma aplicação usando npm start, salvar resultados em arquivos de log e localizar e encerrar processos do Node.js.

A aula ajudou a entender melhor como testar e automatizar uma API diretamente pelo terminal.
