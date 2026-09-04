const express = require('express');
const app = express();
	const PORT = 3000;

app.use(express.json());

// Rota de status da Binario Tech
app.get('/status',(req, res) => {
    res.json({
	servidor: "Binario Tech Core",
	status: "OPERACIONAL",
	montadoras_atendidas: ["Scania", "Mercedes", "VW"],
	uptime_segundos: process.uptime()
    });

 });	

// Rota de Informacoes da Montadora Scania
app.get('/scania/info', (req, res) => {
    res.json({
	montadora: "Scania",
	foco: "Caminhoes Pesados e Ônibus",
	sistema_telemetria: "Ativo",
	unidades_conectadas: 1420
    });
 });



// Rota de Informações da Montadora Volkswagen
app.get('/vw/info', (req, res) => {
    res.json({
        montadora: "Volkswagen",
        foco: "Carros de Passeio e Comerciais",
        sistema_telemetria: "Ativo",
        unidades_conectadas: 980
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
