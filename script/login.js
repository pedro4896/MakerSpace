// Captura o evento de envio do formulário
document.getElementById('login-Form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita o comportamento padrão do formulário

  await realizarLogin()
});

let sessionToken = ''; // Declare a variável no início

// Função de login
async function realizarLogin() {
  const login = document.getElementById('exampleLogin').value;
  const senha = document.getElementById('exampleInputPassword1').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      sessionToken = data.token;  // Aqui você armazena o token na variável sessionToken
      localStorage.setItem("token", sessionToken);
      alert('Login realizado com sucesso!');
      window.location.href = '../index.html';  // Redireciona para a página protegida
    } else {
      alert('Credenciais inválidas. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
  }
}

