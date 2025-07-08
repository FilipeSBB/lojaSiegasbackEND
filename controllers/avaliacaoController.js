import { Avaliacao } from '../models/Avaliacao.js';

// Criar nova avaliação
export const avaliacaoCriar = async (req, res) => {
  try {
    const { produtoId, clienteId, nota, comentario } = req.body;

    if (!produtoId || !clienteId || !nota || !comentario) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    const novaAvaliacao = await Avaliacao.create({
      produtoId,
      clienteId,
      nota,
      comentario
    });

    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ erro: 'Erro ao criar avaliação', detalhes: error.message });
  }
};

// Listar avaliações por produto
export const avaliacaoListarPorProduto = async (req, res) => {
  try {
    const { produtoId } = req.params;

    if (!produtoId) {
      return res.status(400).json({ erro: "ID do produto não fornecido." });
    }

    const avaliacoes = await Avaliacao.findAll({
      where: { produtoId },
      order: [['createdAt', 'DESC']]
    });

    res.json(avaliacoes);
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    res.status(500).json({ erro: 'Erro ao buscar avaliações', detalhes: error.message });
  }
};
