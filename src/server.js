const express = require('../node_modules/express');
const cors = require('../node_modules/cors');  // Importa o pacote CORS
const crypto = require('crypto'); // Para gerar o token de sessão
const db = require('./db');
const app = express();
const port = 3000;

// Configura o CORS para aceitar requisições de qualquer origem
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Permite apenas esse domínio
  credentials: true, // Permite o envio de cookies
}));

// Middleware para analisar JSON no corpo das requisições
app.use(express.json());

// Função para gerar um token de sessão único
function gerarToken() {
  return crypto.randomBytes(16).toString('hex'); // Gera um token de 32 caracteres
}

// Rota de login
app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  // Consulta o banco de dados para verificar as credenciais do usuário
  const query = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  db.query(query, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).send('Erro interno no servidor');
    }

    if (results.length > 0) {
      // Usuário encontrado, gerando um token de sessão
      const token = gerarToken();
      
      // Armazena o token de sessão no banco de dados
      const userId = results[0].id;
      const updateQuery = 'UPDATE usuarios SET session_token = ? WHERE id = ?';
      
      db.query(updateQuery, [token, userId], (err) => {
        if (err) {
          console.error('Erro ao salvar o token no banco:', err);
          return res.status(500).send('Erro interno ao gerar o token');
        }
        
        // Retorna o token de sessão para o cliente
        res.status(200).json({ message: 'Login bem-sucedido!', token });
      });
    } else {
      res.status(401).send('Credenciais inválidas!');
    }
  });
});


function verificarSessao(req, res, next) {
  const authHeader = req.headers.authorization; // Obtém o cabeçalho Authorization

  if (!authHeader || typeof authHeader !== 'string') {
    console.warn('Cabeçalho Authorization ausente ou inválido.');
    return res.status(401).send('Token não fornecido. Faça login novamente.');
  }

  // O cabeçalho Authorization deve seguir o formato "Bearer <token>"
  const [prefix, token] = authHeader.split(' ');

  if (prefix !== 'Bearer' || !token || token.trim().length === 0) {
    console.warn('Token com formato inválido.');
    return res.status(401).send('Formato do token inválido.');
  }

  console.log("Token recebido:", token.substring(0, 10) + '...');

  const query = 'SELECT * FROM usuarios WHERE session_token = ?';
  db.query(query, [token], (err, results) => {
    if (err) {
      console.error('Erro ao verificar o token:', err.message);
      return res.status(500).send('Erro interno do servidor.');
    }

    if (results.length > 0) {
      req.user = results[0]; // Armazena dados do usuário autenticado
      console.log(`Usuário autenticado: ${req.user.nome}`);
      return next();
    }

    console.warn('Token inválido ou não encontrado no banco de dados.');
    return res.status(401).send('Acesso não autorizado.');
  });
}

// Rota protegida
app.get('/pagina-protegida', verificarSessao, (req, res) => {
  res.send(`Bem-vindo, ${req.user.nome}. Esta página é protegida.`);
});

// Rota de logout
app.post('/logout', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).send('Token necessário para logout');
  }

  // Apaga o token de sessão do banco de dados
  const updateQuery = 'UPDATE usuarios SET session_token = NULL WHERE session_token = ?';
  db.query(updateQuery, [token], (err) => {
    if (err) {
      console.error('Erro ao realizar logout:', err);
      return res.status(500).send('Erro ao realizar logout');
    }
    res.status(200).send('Logout realizado com sucesso');
  });
});

// Rota para inserir dados no banco
app.post('/inserir-usuario', (req, res) => {
  const { nome, email, login, senha } = req.body;

  const query = 'INSERT INTO usuarios (nome, email, login, senha) VALUES (?, ?, ?, ?)';

  db.query(query, [nome, email, login, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      res.status(500).send('Erro ao inserir usuário no banco de dados.');
    } else {
      console.log('Usuário inserido com sucesso:', result);
      res.status(201).send('Usuário inserido com sucesso!');
    }
  });
});

// Rota para deletar dados do banco
app.delete('/deletar-usuario/:nome', (req, res) => {
  const { nome } = req.params; // Captura o nome enviado na URL

  const query = 'DELETE FROM usuarios WHERE nome = ?';

  db.query(query, [nome], (err, result) => {
    if (err) {
      console.error('Erro ao deletar usuário:', err);
      res.status(500).send('Erro ao deletar usuário no banco de dados.');
    } else if (result.affectedRows === 0) {
      res.status(404).send('Usuário não encontrado.');
    } else {
      console.log(`Usuário com nome "${nome}" deletado com sucesso.`);
      res.status(200).send(`Usuário com nome "${nome}" deletado com sucesso.`);
    }
  });
});


// Rota para exibir todos os usuários do banco
app.get('/exibir-usuarios', (req, res) => {
  const query = 'SELECT * FROM usuarios';  // Consulta SQL para pegar todos os usuários

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      return res.status(500).send('Erro ao consultar o banco de dados');
    }
    
    // Exibe os resultados no terminal
    console.log('Usuários no banco de dados:', results);
    
    // Retorna os dados ao cliente (se necessário)
    res.json(results);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
