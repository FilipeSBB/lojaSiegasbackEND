import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

export const Log = sequelize.define('Log', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'cadastro_cliente'
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dataHora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  // Essas colunas são automáticas, pode manter elas ativadas
  timestamps: true
});
