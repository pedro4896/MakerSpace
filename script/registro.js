let inputField = document.getElementById("exampleNome")
// Adiciona um evento de digitação ao campo
inputField.addEventListener("input", function () {
    const nome = inputField.value; // Captura o valor atual
    console.log(nome); // Exibe no console
  });