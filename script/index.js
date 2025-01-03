// Função para acessar a página protegida
async function acessarPaginaProtegida() {
  const sessionToken = localStorage.getItem("token");
  console.log("Token Index: ", sessionToken)

  try {
    if (!sessionToken) {  // Verifica se o token está presente
      console.log('Você precisa estar autenticado para acessar esta página.');
      //window.location.href = '../pages/login.html';  // Redireciona para o login
      return;
    }

    const response = await fetch('http://localhost:3000/pagina-protegida', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,  // Usa o token na requisição
      }
    });
    
    console.log('Status da resposta:', response.status);

    if (response.ok) {
      console.log('Usuário autenticado');
      const iconUser = document.getElementById('user-item')
      iconUser.style.display = 'block'
      const entrar = document.getElementById('entrar')
      entrar.style.display = 'none'
    } else {
      const iconUser = document.getElementById('user-item')
      iconUser.style.display = 'none'

      const entrar = document.getElementById('entrar')
      entrar.style.display = 'block'
      console.log('Usuário não autenticado. Redirecionando para o login.');
      alert('Você precisa fazer login para acessar esta página.');
      /*setTimeout(() => {
        window.location.href = '../pages/login.html'; // Redireciona para o login
      }, 1000); // Delay de 1 segundo*/
    }

  } catch (error) {
    console.error('Erro ao acessar a página protegida:', error);
    alert('Erro ao acessar a página. Tente novamente mais tarde.');
  }
}

acessarPaginaProtegida()