const express = require('../node_modules/express');
const bodyParser = require('../node_modules/body-parser');
const cors = require('../node_modules/cors');  // Importa o pacote CORS
const db = require('./db');
const app = express();
const port = 3000;

// Configura o CORS para aceitar requisições de qualquer origem
app.use(cors({
  // origin: 'http://127.0.0.1:5500'  // Permite apenas esse domínio
  origin: '*'
}));

// Middleware para processar dados JSON
app.use(bodyParser.json());

// Rota de validação de login
app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  // Consulta SQL para verificar o login e a senha no banco de dados
  const query = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  db.query(query, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);
      res.status(500).send('Erro interno no servidor');
      return;
    }

    // Se o usuário for encontrado
    if (results.length > 0) {
      res.status(200).send('Login bem-sucedido! Bem-vindo, ' + results[0].nome);
    } else {
      res.status(401).send('Credenciais inválidas!');
    }
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
