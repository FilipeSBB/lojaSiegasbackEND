import { Pedido } from "../models/Pedido.js";

export const pedidoCreate = async (req, res) => {
  const { clienteId, produtos, total } = req.body;

  if (!clienteId || !produtos || !total) {
    return res.status(400).json({ msg: "Dados incompletos do pedido" });
  }

  try {
    const produtosFormatados = produtos.map((produto, index) => {
      if (!produto.imagem) {
        console.warn(`⚠️ Produto no índice ${index} está sem imagem:`, produto);
      }

      return {
        produto: produto.produto,
        quantidade: produto.quantidade,
        preco: produto.preco,
        imagem: produto.imagem || null, // garantir que sempre tenha a chave
      };
    });

    const pedido = await Pedido.create({
      clienteId,
      produtos: JSON.stringify(produtosFormatados),
      total,
    });

    res.status(201).json(pedido);
  } catch (error) {
    console.error("Erro ao registrar pedido:", error);
    res.status(500).json({ msg: "Erro ao registrar pedido", error });
  }
};

export const pedidoIndex = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();

    const resultado = pedidos.map(p => {
      const dados = p.toJSON();
      try {
        dados.produtos = JSON.parse(dados.produtos);
      } catch {
        dados.produtos = [];
      }
      return dados;
    });

    console.log("Pedidos recuperados do banco:", JSON.stringify(resultado, null, 2));
    res.status(200).json(resultado);
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    res.status(500).json({ msg: "Erro ao buscar pedidos", error });
  }
};
