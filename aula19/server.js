require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3099;

app.use(express.json());

// Rota de Status do Servico
app.get('/api/v1/telemetria/status', (req, res) => {
	res.json({
		servico: "Servico de Telemetria Binario Tech",
		status: "OPERACIONAL",
		uptime: process.uptime(),
		pid: process.pid,
		timestamp: new Date()
	});
});

// Rota para Simular Falha Critica / Crash da Aplicacao
app.get('/api/v1/telemetria/crash', (req, res) => {
	console.error(`[ALERTAR] Falha critica simulada pelo PID ${process.pid}` );
	res.status(500).json({ mensagem: "Simulando falha grave no processo!" })
	setTimeout(() => {
		process.exit(1); // Encerra o processo Node forcadamente },  1000);
	});
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Microservico ativo na porta ${PORT} (PID: ${process.pid})`)
});
