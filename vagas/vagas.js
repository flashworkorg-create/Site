let todasVagas = [];
let vagasFiltradas = [];
let pagina = 1;
const porPagina = 5;

// 1. Busca os dados do arquivo JSON
fetch("vagas.json")
  .then((resposta) => resposta.json())
  .then((dados) => {
    todasVagas = dados;
    vagasFiltradas = [...todasVagas];
    render(); // Só renderiza a tela DEPOIS que os dados chegarem
  })
  .catch((erro) => {
    console.error("Erro ao carregar as vagas:", erro);
    document.getElementById("jobs").innerHTML =
      '<p style="text-align:center; padding:30px; color:red;">Erro ao carregar as vagas. Verifique se o servidor local (Live Server) está rodando.</p>';
  });

// 2. Função principal para desenhar as vagas na tela
function render() {
  const lista = document.getElementById("jobs");
  lista.innerHTML = "";

  if (vagasFiltradas.length === 0) {
    lista.innerHTML =
      '<p style="text-align:center; padding:30px; font-size:1.1em;">Nenhuma vaga encontrada com os filtros selecionados.</p>';
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  const inicio = (pagina - 1) * porPagina;
  const fim = inicio + porPagina;

  vagasFiltradas.slice(inicio, fim).forEach((vaga) => {
    const badgePcd = vaga.pcd
      ? `<div class="badge-pcd" aria-label="Vaga afirmativa ou exclusiva para Pessoa com Deficiência">♿ Vaga para PcD</div>`
      : "";

    // HTML do card formatado e limpo
    lista.innerHTML += `
      <article class="job-card">
        <h2 class="job-title">${vaga.titulo}</h2>
        <div class="job-info">
          🏢 <strong>Empresa:</strong> ${vaga.empresa} | 
          <strong>Área:</strong> ${vaga.area} | 
          <strong>Tipo:</strong> ${vaga.tipo}
        </div>
        
        <div class="job-details">
          <p>💰 <strong>Salário:</strong> ${vaga.salario}</p>
          <p>⏰ <strong>Carga Horária:</strong> ${vaga.cargaHoraria}</p>
          <p>📝 <strong>O que vai fazer:</strong> ${vaga.descricao}</p>
        </div>
        
        ${badgePcd}
        <div class="job-actions">
          <a href="/candidatura/candidatura.html?vaga=${encodeURIComponent(vaga.titulo)}" class="btn" aria-label="Candidatar-se para a vaga ${vaga.titulo}">Enviar CV / Candidatar-se</a>
        </div>
      </article>`;
  });

  renderPagination();
}

// 3. Paginação
function renderPagination() {
  const total = Math.ceil(vagasFiltradas.length / porPagina);
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";

  if (total <= 1) return;

  for (let i = 1; i <= total; i++) {
    pag.innerHTML += `<button class="page-btn ${i === pagina ? "active" : ""}" onclick="mudarPagina(${i})" aria-label="Ir para a página ${i}">${i}</button>`;
  }
}

function mudarPagina(p) {
  pagina = p;
  render();
}

// 4. Filtros de pesquisa
function filtrar() {
  const busca = document.getElementById("search").value.toLowerCase();
  const area = document.getElementById("area").value;
  const tipo = document.getElementById("tipo").value;
  const apenasPcd = document.getElementById("pcdOnly").checked;

  vagasFiltradas = todasVagas.filter((v) => {
    const matchBusca =
      v.titulo.toLowerCase().includes(busca) ||
      v.empresa.toLowerCase().includes(busca);
    const matchArea = !area || v.area === area;
    const matchTipo = !tipo || v.tipo === tipo;
    const matchPcd = !apenasPcd || v.pcd === true;

    return matchBusca && matchArea && matchTipo && matchPcd;
  });

  pagina = 1;
  render();
}

// 5. Injeção do Widget de Acessibilidade (VLibras)
const scriptVlibras = document.createElement("script");
scriptVlibras.src = "https://vlibras.gov.br/app/vlibras-plugin.js";

scriptVlibras.onload = () => {
  new window.VLibras.Widget("https://vlibras.gov.br/app");
};

document.body.appendChild(scriptVlibras);
