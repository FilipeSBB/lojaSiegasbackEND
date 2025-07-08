import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const DB_NAME = process.env.DB_NAME || "railway";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

console.log('Conectando ao banco com:');
console.log({ DB_NAME, DB_USER, DB_HOST, DB_PORT });

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.error("Erro: Falha ao se conectar:", error);
  });
