const express = require('express');
const cors = require('cors');
const frotasRoutes = require('./src/routes/frotaRoutes');
const tratarErros = require('./src/middlewares/tratarErros');

const app = express();
const PORT = 3222;

app.use(cors());
app.use(express.json());

app.use('/api/v1/frota', frotasRoutes);

app.use((req, res) => {
    res.status(404).json({ erro: "Rota nao encontrada no servidor." });
});

// Registrar Middlewares de Erro (deve ficar apos todas as rotas)
app.use(tratarErros);

app.listen(PORT, () => {
    console.log(`[Binario Tech] Servidor da Aula 10 ativo na porta ${PORT}`);
});
