  //visualizar senha
  const togglePassword1 = button => { //cria uma const chamada 'togglePassword' e atribui a uma tag 'button'
    button.classList.toggle("showing")// troca a imagem do botao(olho)
    const input = document.getElementById("exampleInputPassword1") //armazena oque foi escrito no input
    //realiza uma verificacao se oque esta na var (input) for do tipo 'password', caso seja altera para o tipo 
    //'texto' e caso nao altera para o tipo 'password'
    input.type = input.type === "password" 
        ? "text"
        : "password"
  }

    //visualizar senha
    const togglePassword2 = button => { //cria uma const chamada 'togglePassword' e atribui a uma tag 'button'
        button.classList.toggle("showing")// troca a imagem do botao(olho)
        const input = document.getElementById("exampleInputPassword2") //armazena oque foi escrito no input
        //realiza uma verificacao se oque esta na var (input) for do tipo 'password', caso seja altera para o tipo 
        //'texto' e caso nao altera para o tipo 'password'
        input.type = input.type === "password" 
            ? "text"
            : "password"
      }

          //visualizar senha
    const togglePassword3 = button => { //cria uma const chamada 'togglePassword' e atribui a uma tag 'button'
      button.classList.toggle("showing")// troca a imagem do botao(olho)
      const input = document.getElementById("passwordLogin") //armazena oque foi escrito no input
      //realiza uma verificacao se oque esta na var (input) for do tipo 'password', caso seja altera para o tipo 
      //'texto' e caso nao altera para o tipo 'password'
      input.type = input.type === "password" 
          ? "text"
          : "password"
    }