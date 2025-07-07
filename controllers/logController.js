import { Log } from '../models/Log.js';

export const logIndex = async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar logs' });
  }
};