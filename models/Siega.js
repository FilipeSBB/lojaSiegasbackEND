import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Siega = sequelize.define('padaria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
imagem: {
  type: DataTypes.TEXT, // aceita strings longas
},
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  produto: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  categorias: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  paranoid: true
});