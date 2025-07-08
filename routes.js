import { Router } from "express"; 

import { clienteCreate, clienteIndex, clienteLogin } from "./controllers/clienteController.js";
import { SiegaCreate, SiegaDestaca, SiegaDestaques, SiegaIndex, SiegaDestroy, SiegaUpdate, SiegaShow } from "./controllers/SiegaController.js";
import { logIndex } from "./controllers/logController.js";
import { pedidoCreate, pedidoIndex } from "./controllers/OrderController.js";
import { avaliacaoCriar, avaliacaoListarPorProduto } from "./controllers/avaliacaoController.js"; // <-- IMPORTAÇÃO AQUI

const router = Router();

router.get('/clienteslistar', clienteIndex)
      .post('/clientes', clienteCreate)
      .post('/login', clienteLogin);

router.get('/logs', logIndex);

router.get('/listarprodutos', SiegaIndex)
      .get('/listarprodutos/:id', SiegaShow)
      .get('/siega/destaques', SiegaDestaques)
      .post('/adicionarproduto', SiegaCreate)
      .post('/siegaDestaca/:id', SiegaDestaca)
      .delete('/produto/destroy/:id', SiegaDestroy)
      .put('/alterar/:id', SiegaUpdate);

router.get('/pedidos', pedidoIndex)
      .post('/pedidos', pedidoCreate);

// ✅ ROTAS DE AVALIAÇÃO
router.post('/avaliacoes', avaliacaoCriar); // Cadastrar nova avaliação
router.get('/avaliacoes/:produtoId', avaliacaoListarPorProduto); // Listar avaliações de um produto

export default router;