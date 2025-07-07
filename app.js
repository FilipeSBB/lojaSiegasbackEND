import express from 'express';
import cors from 'cors';
import routes from './routes.js';

import { sequelize } from './databases/conecta.js';

import { Cliente } from './models/Cliente.js';

import { Pedido } from './models/Pedido.js';
import { Siega } from './models/Siega.js';

const app = express();
const port = 55000;

app.use(express.json());
app.use(cors());

app.use(routes);

async function conecta_db() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados realizada com sucesso');

    await Cliente.sync();
    console.log("Tabela Cliente criada com sucesso");

    await Siega.sync();
    console.log("Tabela de Produtos criada com sucesso");

    await Pedido.sync();
    console.log("Tabela de Pedidos criada com sucesso");

  } catch (error) {
    console.error('Erro na conexão com o banco: ', error);
  }
}

conecta_db();

app.get('/', (req, res) => {
  res.send('API Projeto TCC - Lojas Siegas');
});

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`);
});
