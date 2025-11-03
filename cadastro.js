// Adicionar familiar
document.getElementById('addFamiliar').addEventListener('click', function() {
  const familiares = document.getElementById('familiares');
  const novo = document.createElement('div');
  novo.classList.add('familiar');
  novo.innerHTML = `
    <label>Nome do familiar</label>
    <input type="text" class="nome-familiar">
    <label>Telefone</label>
    <input type="tel" class="telefone-familiar">
    <label>Parentesco</label>
    <input type="text" class="parentesco-familiar">
  `;
  familiares.insertBefore(novo, this);
});

// Adicionar medicamento
document.getElementById('addMedicamento').addEventListener('click', function() {
  const medicamentos = document.getElementById('medicamentos');
  const novo = document.createElement('div');
  novo.classList.add('medicamento');
  novo.innerHTML = `
    <label>Nome do medicamento</label>
    <input type="text" class="nome-medicamento">
    <label>Horário</label>
    <input type="time" class="horario-medicamento">
    <label>MG</label>
    <input type="text" class="mg-medicamento">
    <label>ML (opcional)</label>
    <input type="text" class="ml-medicamento">
  `;
  medicamentos.insertBefore(novo, this);
});

// Salvar cadastro
document.getElementById('salvar').addEventListener('click', function() {
  const nome = document.getElementById('nome_idoso').value;
  const nascimento = document.getElementById('nascimento').value;
  const cpf = document.getElementById('cpf').value;

  const familiares = [...document.querySelectorAll('.familiar')].map(f => ({
    nome: f.querySelector('.nome-familiar').value,
    telefone: f.querySelector('.telefone-familiar').value,
    parentesco: f.querySelector('.parentesco-familiar').value
  }));

  const medicamentos = [...document.querySelectorAll('.medicamento')].map(m => ({
    nome: m.querySelector('.nome-medicamento').value,
    horario: m.querySelector('.horario-medicamento').value,
    mg: m.querySelector('.mg-medicamento').value,
    ml: m.querySelector('.ml-medicamento').value
  }));

  const dados = {
    idoso: { nome, nascimento, cpf },
    familiares,
    medicamentos
  };

  console.log('Cadastro salvo:', dados);
  alert("Cadastro salvo com sucesso!");
});
