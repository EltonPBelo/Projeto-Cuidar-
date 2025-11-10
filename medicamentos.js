/* Navegação entre telas */
const screens = {
  programacao: document.getElementById("programacao"),
  cadastro: document.getElementById("cadastro"),
  perfil: document.getElementById("perfil"),
};
const buttons = {
  prog: document.getElementById("btnProg"),
  cad: document.getElementById("btnCad"),
  perfil: document.getElementById("btnPerfil"),
};

function showScreen(name){
  for(let k in screens) screens[k].classList.remove("active");
  screens[name].classList.add("active");

  for(let k in buttons) buttons[k].classList.remove("active");
  if(name === "programacao") buttons.prog.classList.add("active");
  if(name === "cadastro") buttons.cad.classList.add("active");
  if(name === "perfil") buttons.perfil.classList.add("active");
}

buttons.prog.onclick = () => showScreen("programacao");
buttons.cad.onclick = () => showScreen("cadastro");
buttons.perfil.onclick = () => showScreen("perfil");

/* Dados de exemplo e persistência */
const defaultMeds = [
  { id: cryptoRandomId(), name: "Vitamina D", time: "08:00", tag: "V", color: "V", done:false },
  { id: cryptoRandomId(), name: "Vitamina C", time: "09:00", tag: "V", color: "V", done:false },
  { id: cryptoRandomId(), name: "Losartana", time: "10:00", tag: "L", color: "L", done:false },
  { id: cryptoRandomId(), name: "Insulina", time: "15:00", tag: "I", color: "I", done:false },
  { id: cryptoRandomId(), name: "Glifage", time: "20:00", tag: "G", color: "G", done:false },
];

function cryptoRandomId(){ return Math.random().toString(36).slice(2,9); }

function loadMeds(){
  const raw = localStorage.getItem("cuidar_meds");
  if(!raw) {
    localStorage.setItem("cuidar_meds", JSON.stringify(defaultMeds));
    return defaultMeds.slice();
  }
  try { return JSON.parse(raw); } catch(e){ return defaultMeds.slice(); }
}

function saveMeds(list){
  localStorage.setItem("cuidar_meds", JSON.stringify(list));
}

/* Renderiza a lista de medicamentos */
const medListEl = document.getElementById("medList");
function renderMeds(){
  const meds = loadMeds();
  medListEl.innerHTML = "";
  meds.forEach(m => {
    const item = document.createElement("div");
    item.className = "med-item";
    item.innerHTML = `
      <div class="med-left">
        <div class="circle ${m.color}">${m.tag}</div>
        <span>${m.name}</span>
      </div>
      <div class="med-right">
        <span style="margin-right:12px">${m.time}</span>
        <input type="checkbox" class="check" data-id="${m.id}" ${m.done ? "checked":""}>
      </div>
    `;
    medListEl.appendChild(item);
  });

  // add listeners for checkboxes
  document.querySelectorAll('.check').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      const meds = loadMeds();
      const idx = meds.findIndex(x => x.id === id);
      if(idx >= 0){
        meds[idx].done = e.target.checked;
        saveMeds(meds);
      }
    });
  });
}

/* Cadastro novo medicamento */
const salvarBtn = document.getElementById("salvarBtn");
salvarBtn.addEventListener("click", () => {
  const nome = document.getElementById("nomeMed").value.trim();
  const hora = document.getElementById("horaMed").value;
  if(!nome || !hora){ alert("Preencha o nome e o horário do medicamento!"); return; }

  const meds = loadMeds();
  const tag = nome.trim().charAt(0).toUpperCase();
  const colorClass = ["V","L","I","G"].includes(tag) ? tag : "V";

  meds.push({ id: cryptoRandomId(), name: nome, time: hora, tag: tag, color: colorClass, done:false });
  saveMeds(meds);
  renderMeds();
  document.getElementById("nomeMed").value="";
  document.getElementById("horaMed").value="";
  showScreen("programacao");
});

/* Inicializa */
renderMeds();

/* Ajusta os boxes de hora (apenas visual) */
function updateTimeBoxes(){
  const now = new Date();
  const h = String(now.getHours()).padStart(2,"0");
  const m = String(now.getMinutes()).padStart(2,"0");
  document.getElementById("hourBox").textContent = h;
  document.getElementById("minBox").textContent = m;
}
updateTimeBoxes();
setInterval(updateTimeBoxes, 30*1000);

/* Registrando service worker para PWA */
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch(err => console.warn('Erro ao registrar SW:', err));
}
