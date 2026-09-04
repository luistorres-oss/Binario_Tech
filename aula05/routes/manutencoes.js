const express = require('express');
const router = express.Router();

let manutencoes = [
  {
    id: 1,
    caminhao: "Caminhao 01",
    descricao: "Troca de oleo",
    valor: 350
  }
];

router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

router.post('/', (req, res) => {
  const { caminhao, descricao, valor } = req.body;

  if (!caminhao || !descricao || !valor) {
    return res.status(400).json({
      erro: "Campos 'caminhao', 'descricao' e 'valor' sao obrigatorios."
    });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    caminhao,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);

  res.status(201).json(novaManutencao);
});

module.exports = router;
