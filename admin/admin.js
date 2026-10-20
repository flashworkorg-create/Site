let vagas = [];

function login() {
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "w0rK") {
    sessionStorage.setItem("flashwork_admin_auth", "true");
    checkAuth();
  } else {
    alert("Usuário ou senha incorretos!");
  }
}

function logout() {
  sessionStorage.removeItem("flashwork_admin_auth");
  window.location.reload();
}

function checkAuth() {
  if (sessionStorage.getItem("flashwork_admin_auth")) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-content").style.display = "block";
    document.getElementById("btn-logout").style.display = "inline-block";
    renderAdmin();
  }
}

function adicionarVaga() {
  const titulo = document.getElementById("titulo").value;
  const area = document.getElementById("area").value;
  const tipo = document.getElementById("tipo").value;
  const empresa = document.getElementById("empresa").value;
  const isPcd = document.getElementById("isPcd").checked;

  if (!titulo || !empresa) {
    alert("Preencha os campos obrigatórios!");
    return;
  }

  vagas.push({ id: Date.now(), titulo, area, tipo, empresa, pcd: isPcd });
  alert("Vaga adicionada!");
  renderAdmin();
}

function renderAdmin() {
  const lista = document.getElementById("lista-vagas-admin");
  lista.innerHTML = "";
  vagas.forEach((v) => {
    lista.innerHTML += `
        <tr>
          <td>${v.titulo}</td>
          <td>${v.empresa}</td>
          <td>${v.pcd ? "Sim ♿" : "Não"}</td>
          <td><button class="btn btn-danger" onclick="excluirVaga(${v.id})">Excluir</button></td>
        </tr>
      `;
  });
}

function excluirVaga(id) {
  vagas = vagas.filter((v) => v.id !== id);
  renderAdmin();
}

checkAuth();

const scriptVlibras = document.createElement("script");
scriptVlibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

scriptVlibras.onload = () => {
  new window.VLibras.Widget("https://vlibras.gov.br/app");
};

document.body.appendChild(scriptVlibras);
