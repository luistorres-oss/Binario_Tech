const express = require('express');
const router = express.Router();
const validaCnh = require('../middlewares/validaCnh');

let motoristas = [
    {
        id: 1,
        nome: "Carlos Silva",
        cnh: "12345678900",
        categoria: "E",
        ativo: true
    },
    {
        id: 2,
        nome: "Ana Pereira",
        cnh: "98765432100",
        categoria: "D",
        ativo: true
    }
];

// GET - Listar motoristas
router.get('/', (req, res) => {
    res.status(200).json(motoristas);
});

// POST - Cadastrar motorista
router.post('/', validaCnh, (req, res) => {
    const { nome, cnh, categoria } = req.body;

    if (!nome || !categoria) {
        return res.status(400).json({
            erro: "Nome e categoria sao obrigatorios."
        });
    }

    const novoMotorista = {
        id: motoristas.length
            ? Math.max(...motoristas.map(m => m.id)) + 1
            : 1,
        nome,
        cnh,
        categoria,
        ativo: true
    };

    motoristas.push(novoMotorista);

    res.status(201).json(novoMotorista);
});

module.exports = router;
