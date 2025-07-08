import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Avaliacao = sequelize.define("Avaliacao", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produtoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clienteId: {
    type: DataTypes.STRING(100), // UUID ou string que identifique o cliente
    allowNull: false,
  },
  nota: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  paranoid: true,
  tableName: "Avaliacoes",
});
