// Captura o evento de envio do formulário
document.getElementById('login-Form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Obtém os valores dos campos de entrada
    const login = document.getElementById('exampleLogin').value;
    const senha = document.getElementById('exampleInputPassword1').value;
    const nome = document.getElementById('exampleNome').value;
    const email = document.getElementById('exampleInputEmail1').value;

    try {
      // Envia uma requisição POST para o servidor
      const response = await fetch('http://localhost:3000/inserir-usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nome, email, login, senha }),
      });
      if (response.ok) {
        console.log('Registro bem-sucedido! Redirecionando...')

        // Redireciona o usuário após o login (substitua pela URL desejada)
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 2000);
      } else {
        console.log("Registro inválido!")
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar ao servidor!');
    }
  });