const Manutencao = require('../models/Manutencao');

const manutencaoController = {
  criar: async (req, res) => {
    try {
      const novaManutencao = await Manutencao.create(req.body);
      res.status(201).json(novaManutencao);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao registrar manutenção", detalhe: erro.message });
    }
  },

  listarComFiltros: async (req, res) => {
    try {
      const { minCusto, status, placa } = req.query;
      let query = {};

      if (minCusto) query.custoTotal = { $gte: Number(minCusto) };
      if (status) query.status = status;
      if (placa) query.veiculoPlaca = { $regex: placa, $options: 'i' };

      const resultados = await Manutencao.find(query).sort({ createdAt: -1 });
      res.status(200).json(resultados);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar manutenções." });
    }
  },

  adicionarPeca: async (req, res) => {
    try {
      const { id } = req.params;
      const novaPeca = req.body;

      const atualizado = await Manutencao.findByIdAndUpdate(
        id,
        { $push: { pecasSubstituidas: novaPeca } },
        { new: true, runValidators: true }
      );

      if (!atualizado) {
        return res.status(404).json({ erro: "Manutenção não encontrada." });
      }

      res.status(200).json(atualizado);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao adicionar peça.", detalhe: erro.message });
    }
  },

  atualizarStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const atualizado = await Manutencao.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!atualizado) {
        return res.status(404).json({ erro: "Registro de manutenção não encontrado." });
      }

      res.status(200).json(atualizado);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao atualizar registro.", detalhe: erro.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const removido = await Manutencao.findByIdAndDelete(id);

      if (!removido) {
        return res.status(404).json({ erro: "Registro não encontrado para exclusão." });
      }

      res.status(200).json({ mensagem: "Registro de manutenção excluído com sucesso!" });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao excluir registro." });
    }
  }
};

module.exports = manutencaoController;
