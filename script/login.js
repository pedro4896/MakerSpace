// Captura o evento de envio do formulário
document.getElementById('login-Form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  // Obtém os valores dos campos de entrada
  const login = document.getElementById('exampleLogin').value;
  const senha = document.getElementById('exampleInputPassword1').value;

  try {
    // Envia uma requisição POST para o servidor com credentials
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, senha }),
      credentials: 'include',  // Inclui cookies (necessário para a sessão)
    });

    if (response.ok) {
      console.log('Login bem-sucedido! Redirecionando...')

      // Redireciona o usuário após o login (substitua pela URL desejada)
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 2000);
    } else {
      console.log("Credenciais inválidas!");
      alert('Credenciais inválidas! Tente novamente.');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    alert('Erro ao conectar ao servidor!');
  }
});
