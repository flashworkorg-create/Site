function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  // Credenciais de exemplo para administração
  if (username === "admin" && password === "w0rK") {
    sessionStorage.setItem("flashwork_admin_auth", "true");
    window.location.href = "/admin/admin.html";
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

const scriptVlibras = document.createElement("script");
scriptVlibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

scriptVlibras.onload = () => {
  new window.VLibras.Widget("https://vlibras.gov.br/app");
};

document.body.appendChild(scriptVlibras);
