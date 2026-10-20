function criarConta() {
  const celular = document.getElementById("celular").value;
  if (!/^\d+$/.test(celular)) {
    alert("O celular deve conter apenas números!");
    return;
  }
  alert("Conta empresa criada com sucesso!");
  window.location.href = "/home/index.html";
}

const scriptVlibras = document.createElement("script");
scriptVlibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

scriptVlibras.onload = () => {
  new window.VLibras.Widget("https://vlibras.gov.br/app");
};

document.body.appendChild(scriptVlibras);
