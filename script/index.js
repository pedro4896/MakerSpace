async function acessarPaginaProtegida() {
    try {
        const response = await fetch('http://localhost:3000/pagina-protegida', {
            credentials: 'include' // Envia cookies com a requisição
          });
          
  
      console.log('Status da resposta:', response.status);  // Verifique o status da resposta
      console.log('Resposta ok:', response.ok);  // Verifique se está 200 (OK)
      console.log('Response: ', response);
  
      /*if (response.ok) {
        const texto = await response.text();
        document.getElementById('conteudo').innerText = texto;
      } 
      if (!response.ok) {
        console.log('Usuário não autenticado. Redirecionando para o login.');
        alert('Você precisa fazer login para acessar esta página.');
        setTimeout(() => {
          window.location.href = '../pages/login.html'; // Redireciona para a página de login após um breve delay
        }, 1000); // Delay de 1 segundo antes do redirecionamento
      }*/
      
    } catch (error) {
      console.error('Erro ao acessar a página protegida:', error);
      alert('Erro ao acessar a página. Tente novamente mais tarde.');
    }
  }
  
  
  // Chame a função para verificar acesso
  acessarPaginaProtegida();
  