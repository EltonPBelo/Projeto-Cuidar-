const paginas = [
  [
    { nome: "Insulina" },
    { nome: "Losartana" },
    { nome: "Vitamina C" }
  ],
  [
    { nome: "Omeprazol" },
    { nome: "Dipirona" },
    { nome: "Prednisona" }
  ],
  [
    { nome: "Cálcio" },
    { nome: "Vitamina D" },
    { nome: "Paracetamol" }
  ]
];

let paginaAtual = 0;

const container = document.getElementById("notificacoes");
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

function renderPagina() {
  container.innerHTML = "";
  const notificacoes = paginas[paginaAtual];

  notificacoes.forEach((n, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <span class="close-btn">&times;</span>
      <h4>Notificação</h4>
      <p>${n.nome}</p>
      <button class="btn">Tomar Remédio</button>
    `;

    // Botão de fechar
    card.querySelector(".close-btn").addEventListener("click", () => {
      card.remove();
    });

    // Botão "Tomar Remédio"
    const btn = card.querySelector(".btn");
    btn.addEventListener("click", () => {
      if (!btn.classList.contains("taken")) {
        btn.textContent = "Tomado ✔";
        btn.classList.add("taken");
      }
    });

    container.appendChild(card);
  });
}

// Botões de navegação
btnPrev.addEventListener("click", () => {
  if (paginaAtual > 0) {
    paginaAtual--;
    renderPagina();
  }
});

btnNext.addEventListener("click", () => {
  if (paginaAtual < paginas.length - 1) {
    paginaAtual++;
    renderPagina();
  }
});

// Carrega a primeira página ao iniciar
renderPagina();
