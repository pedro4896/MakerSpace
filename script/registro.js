// Obtém os valores dos campos de entrada
let login = document.getElementById('exampleLogin');
let senha = document.getElementById('exampleInputPassword1');
let confirm_Senha = document.getElementById('exampleInputPassword2');
let nome = document.getElementById('exampleNome');
let email = document.getElementById('exampleInputEmail1');
let validarSenha = document.getElementById('passwordHelp');

confirm_Senha.addEventListener("input", () => {
  let senhaValor = senha.value; // Obtém o valor atual do campo senha
  let confirmSenhaValor = confirm_Senha.value; // Obtém o valor atual do campo de confirmação

  if(senhaValor !== confirmSenhaValor){
    validarSenha.style.color = 'red'
    validarSenha.textContent = 'As senhas não coincidem, tente novamente'
  } else{
    validarSenha.style.color = 'green'
    validarSenha.textContent = 'As senhas coincidem!'
  }
});

// Captura o evento de envio do formulário
document.getElementById('login-Form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    function validarSenhas() {
      let senhaValor = senha.value; // Obtém o valor atual do campo senha
      let confirmSenhaValor = confirm_Senha.value; // Obtém o valor atual do campo de confirmação
    
      if (senhaValor !== confirmSenhaValor) {
          validarSenha.textContent = 'As senhas não coincidem, tente novamente'
          validarSenha.className = 'erro'
          return false; // Impede o envio do formulário
      } else{
        
      }
      return true; // Permite o envio do formulário
    }

    if(validarSenhas()){
      nome = nome.value;
      email = email.value;
      login = login.value;
      senha = senha.value;
  
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
            window.location.href = '../pages/login.html';
          }, 2000);
        } else {
          console.log("Registro inválido!")
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar ao servidor!');
      }
    }
  });