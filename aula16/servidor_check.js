const express = require('express');
const app = express();
const PORT = 3222;

app.use(express.json());

	app.get('/api/v1/status-servidor', (req, res) => {
		res.json({
			status: "ONLINE",
			ambiente: "Servidor Local de Prova - Binario Tech",
			usuario: process.env.USER || "aluno",
			dataCheck: new Date()
		});
	});

	app.listen(PORT, () => {
		console.log(`[Binario Tech] Servidor de Validação da Aula16 ativo na Porta ${PORT}`);
	});
