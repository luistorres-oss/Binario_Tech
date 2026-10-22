const express = require('express');
const router = express.Router();

let manutencoes = [
    {
        id: 1,
        placa: "ABC-1234",
        descricao: "Troca de oleo",
        valor: 350
    }
];

// GET - Listar manutencoes
router.get('/', (req, res) => {
    res.status(200).json(manutencoes);
});

// POST - Cadastrar manutencao
router.post('/', (req, res) => {
    const { placa, descricao, valor } = req.body;

    if (
        !placa ||
        !descricao ||
        typeof valor !== 'number' ||
        valor < 0
    ) {
        return res.status(400).json({
            erro: "Placa, descricao e valor numerico valido sao obrigatorios."
        });
    }

    const novaManutencao = {
        id: manutencoes.length
            ? Math.max(...manutencoes.map(m => m.id)) + 1
            : 1,
        placa,
        descricao,
        valor
    };

    manutencoes.push(novaManutencao);

    res.status(201).json(novaManutencao);
});

module.exports = router;
