const mysql = require('../node_modules/mysql2');

// Configuração do banco de dados
const db = mysql.createConnection({
  host: '127.0.0.1',    // Host do banco
  port: 3306, // Porta padrão do MySQL
  user: 'root',         // Usuário do MySQL
  password: 'MakerSpace',         // Senha do MySQL (coloque sua senha aqui)
  database: 'sistema_login' // Nome do banco de dados
});

// Conexão ao banco
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão com o MySQL estabelecida!');
});

// Exportar a conexão para ser usada em outros arquivos
module.exports = db;
