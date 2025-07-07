// models/Pedido.js
import { DataTypes } from "sequelize";
import { sequelize } from "../databases/conecta.js";

export const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clienteId: {
    type: DataTypes.STRING(100),  // Alterado para STRING(100) para aceitar UUID
    allowNull: false,
  },
  produtos: {
    type: DataTypes.TEXT, // JSON string com produtos
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  paranoid: true,
  tableName: "Pedidos",
});
