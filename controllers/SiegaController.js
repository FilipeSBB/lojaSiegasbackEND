import { Siega } from '../models/Siega.js';

export const SiegaIndex = async (req, res) => {
  try {
    const Siegas = await Siega.findAll();

    const resultado = Siegas.map(Siega => {
      const dados = Siega.toJSON();
      delete dados.createdAt;
      delete dados.updatedAt;
      delete dados.deletedAt;

      // Converte o campo imagem (JSON string) para array
      try {
        dados.imagem = JSON.parse(dados.imagem);
      } catch {
        // Se não for JSON válido, deixa como string única
      }

      return dados;
    });

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const SiegaDestaques = async (req, res) => {
  try {
    const Siegas = await Siega.findAll({ where: { destaque: true } });

    const resultado = Siegas.map(p => {
      const item = p.toJSON();
      delete item.createdAt;
      delete item.updatedAt;
      delete item.deletedAt;
      delete item.destaque;

      try {
        item.imagem = JSON.parse(item.imagem);
      } catch {}

      return item;
    });

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const SiegaDestaca = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID não fornecido" });
  }

  try {
    const produto = await Siega.findByPk(id); // ← Renomeado para evitar conflito

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    produto.destaque = !produto.destaque; // ← Alterna o destaque
    await produto.save();

    res.status(200).json(produto);
  } catch (error) {
    console.error(error); // útil para debug
    res.status(500).json({ error: "Erro ao atualizar destaque." });
  }
};


export const SiegaCreate = async (req, res) => {
  const { produto, categorias, preco, imagem, descricao } = req.body;

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (!produto || !categorias || !preco || !imagem || !descricao) {
    return res.status(400).json({
      id: 0,
      msg: "Erro... Informe todos os dados necessários",
    });
  }

  try {
    // Verifica se já existe um produto com o mesmo nome
    const existingProduct = await Siega.findOne({ where: { produto } });
    if (existingProduct) {
      return res.status(400).json({
        id: 0,
        msg: "Já existe um produto com esse nome",
      });
    }

    // Cria o produto, armazenando o campo imagem como string JSON
    const novoProduto = await Siega.create({
      produto,
      categorias,
      preco,
      imagem: JSON.stringify(imagem),
      descricao,
    });

    // Prepara o objeto de retorno
    const resultado = novoProduto.toJSON();
    delete resultado.createdAt;
    delete resultado.updatedAt;
    delete resultado.deletedAt;

    // Converte imagem de volta para array antes de retornar
    try {
      resultado.imagem = JSON.parse(resultado.imagem);
    } catch {
      resultado.imagem = [];
    }

    return res.status(201).json(resultado);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return res.status(500).json({ msg: "Erro ao criar o produto." });
  }
};

export async function SiegaUpdate(req, res) {
  const { id } = req.params;
  const { produto, categorias, preco, imagem, descricao } = req.body;

  if (!produto || !categorias || !preco || !imagem || !descricao) {
    res.status(400).json({ error: "Erro... Informe produto, categoria, preço, classificação, imagem e descrição." });
    return;
  }

  try {
    // Atualiza o campo imagem convertendo array em string JSON
    const updatedProduto = await Siega.update(
      {
        produto,
        categorias,
        preco,
        imagem: JSON.stringify(imagem),
        descricao,
      },
      {
        where: { id },
      }
    );

    if (updatedProduto[0] === 0) {
      res.status(404).json({ error: "Produto não encontrado." });
    } else {
      res.status(200).json({ message: "Produto atualizado com sucesso." });
    }
  } catch (error) {
    console.error("Erro ao atualizar o produto:", error);
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
}

export const SiegaShow = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Siega.findByPk(id); // <- Aqui está a correção

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    const resultado = produto.toJSON(); // <- usando 'produto' corretamente
    delete resultado.createdAt;
    delete resultado.updatedAt;
    delete resultado.deletedAt;

    try {
      resultado.imagem = JSON.parse(resultado.imagem);
    } catch {}

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

export const SiegaDestroy = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "ID do produto não fornecido" });
    }

    const produto = await Siega.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    await produto.destroy(); // uso correto
    res.status(200).json({ msg: "Ok! Removido com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir o produto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
