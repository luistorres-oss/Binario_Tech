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
