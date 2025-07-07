import { Cliente } from '../models/Cliente.js';
import { Log } from '../models/Log.js';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const clienteIndex = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const clienteCreate = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
  }

  try {
    const existingCliente = await Cliente.findOne({ where: { email } });

    if (existingCliente) {
      return res.status(400).json({ id: 0, msg: "Erro... Email já está em uso" });
    }

    const id = uuidv4();
    const token = uuidv4();

    // 🔐 Criptografar a senha com bcrypt
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const cliente = await Cliente.create({
      id,
      senha: senhaCriptografada,
      nome,
      token,
      email,
      admin: '0'
    });

    const resultado = cliente.toJSON();
    delete resultado.createdAt;
    delete resultado.updatedAt;

    // 📝 Criar log
    await Log.create({
      usuario: nome,
      tipo: 'cadastro_cliente',
      descricao: `Novo cliente cadastrado: ${nome} (${email})`,
      dataHora: new Date()
    });

    return res.status(201).json({ cliente: resultado, token });
  } catch (error) {
    return res.status(500).send(error);
  }
};


export const clienteLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha são obrigatórios' });
    }

    const cliente = await Cliente.findOne({ where: { email } });

    if (!cliente) {
      console.log("Tentativa de login com e-mail inexistente:", email);
      return res.status(400).json({ erro: 'E-mail ou senha incorretos' });
    }

    const senhaCorreta = bcrypt.compareSync(senha, cliente.senha);
    if (!senhaCorreta) {
      console.log("Senha incorreta para o e-mail:", email);
      return res.status(400).json({ erro: 'E-mail ou senha incorretos' });
    }

    let token = cliente.token;
    if (!token) {
      const segredo = process.env.JWT_KEY || `seu_segredo_${cliente.email}_secreto`;
      token = jwt.sign({ clienteId: cliente.id, email: cliente.email }, segredo, { expiresIn: '1h' });

      await Cliente.update({ token }, { where: { id: cliente.id } });
    }

    console.log("Login bem-sucedido para:", cliente.email);

    return res.status(200).json({
      token,
      userType: cliente.admin === '1' ? 'admin' : 'cliente',
      userName: cliente.nome,
      clienteId: cliente.id,  // <-- aqui, para frontend receber
    });

  } catch (error) {
    console.error("Erro durante login:", error);
    return res.status(500).json({ erro: 'Erro ao processar a solicitação' });
  }
};




