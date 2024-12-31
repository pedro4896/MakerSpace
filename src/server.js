const express = require('../node_modules/express');
const bodyParser = require('../node_modules/body-parser');
const cors = require('../node_modules/cors');  // Importa o pacote CORS
const session = require('../node_modules/express-session'); // Importa o pacote de sessões
const db = require('./db');
const app = express();
const port = 3000;

// Configura o CORS para aceitar requisições de qualquer origem
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Permite apenas esse domínio
  credentials: true, // Permite o envio de cookies
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Permitir o envio do cookie
  res.header('Access-Control-Allow-Credentials', 'true'); // Permite o envio de cookies
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE'); // Métodos permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // Cabeçalhos permitidos
  next();
});



// Configura middleware para JSON e sessões
app.use(bodyParser.json());
app.use(session({
  secret: 'MakerSpace', // Substitua por uma chave segura
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // Somente se estiver em produção com HTTPS, // True apenas se estiver usando HTTPS
    httpOnly: true,
    maxAge: 3600000, // Tempo de expiração (1 hora)
    sameSite: 'None' // Isso permite o envio de cookies entre diferentes origens
  }
}));

// Middleware para verificar autenticação
function verificarAutenticacao(req, res, next) {
  console.log('Sessão no backend:', req.session); // Verifique se a sessão está presente
  if (req.session.user) {  // Confirma se a sessão do usuário existe
    next(); // Usuário autenticado, segue para a rota
  } else {
    res.status(401).send('Acesso não autorizado. Faça login primeiro.');
  }
}

app.get('/pagina-protegida', verificarAutenticacao, (req, res) => {
  res.send(`Bem-vindo, ${req.session.user.nome}. Esta página é protegida.`);
});

app.post('/login', (req, res) => {
  const { login, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE login = ? AND senha = ?';
  db.query(query, [login, senha], (err, results) => {
    if (err) {
      console.error('Erro ao consultar o banco:', err);
      return res.status(500).send('Erro interno no servidor');
    }

    if (results.length > 0) {
      req.session.user = { 
        id: results[0].id, 
        nome: results[0].nome 
      };
      console.log('Sessão do usuário criada:', req.session); // Verifique se a sessão foi criada
      res.status(200).send('Login bem-sucedido!');
    } else {
      res.status(401).send('Credenciais inválidas!');
    }
  });
});


// Rota para logout
app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).send('Erro ao encerrar a sessão.');
      return;
    }
    res.send('Logout realizado com sucesso.');
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
