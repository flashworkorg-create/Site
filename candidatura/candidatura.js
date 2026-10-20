// Captura o nome da vaga enviado pela URL
const params = new URLSearchParams(window.location.search);
const vagaNome = params.get("vaga");

if (vagaNome) {
  document.getElementById("nome-vaga").innerText = decodeURIComponent(vagaNome);
}

function enviarCandidatura() {
  const curriculo = document.getElementById("curriculo").files[0];

  if (!curriculo) {
    alert("Por favor, anexe o ficheiro do seu currículo.");
    return;
  }

  // Oculta o formulário e exibe a mensagem de sucesso
  document.getElementById("form-candidatura").style.display = "none";
  document.getElementById("vaga-titulo-display").style.display = "none";
  document.getElementById("box-sucesso").style.display = "block";
}

const scriptVlibras = document.createElement("script");
scriptVlibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

scriptVlibras.onload = () => {
  new window.VLibras.Widget("https://vlibras.gov.br/app");
};

document.body.appendChild(scriptVlibras);
