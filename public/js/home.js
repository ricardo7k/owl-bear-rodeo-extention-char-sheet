function atualizarValor(sliderId, valorId) {
  const slider = document.getElementById(sliderId);
  const valor = document.getElementById(valorId);
  valor.textContent = slider.value;
}

function getid(id) {
 return document.querySelector("#" + id);
}
function getclass(id) {
 return document.getElementsByClassName(id);
}
function getobj(id) {
 return document.getElementsByTagName(id);
}

function clearTela() {
    getid("char_name").value = "";
    getid("char_level").value = "";
    getid("char_vida").value = "";
    getid("char_acoes").value = "";
    getid("char_def").value = "";
    getid("char_init").value = "";
    getid("money").value = "";
    getid("recompensa").value = "";

    getid("fisicoValor").textContent = getid("fisico").value = "";
    getid("intelectoValor").textContent = getid("intelecto").value = "";
    getid("coragemValor").textContent = getid("coragem").value = "";
    getid("agilidadeValor").textContent = getid("agilidade").value = "";

    getid("combateValor").textContent = getid("combate").value = "";
    getid("negociosValor").textContent = getid("negocios").value = "";
    getid("montariaValor").textContent = getid("montaria").value = "";
    getid("tradicaoValor").textContent = getid("tradicao").value = "";
    getid("labutaValor").textContent = getid("labuta").value = "";
    getid("exploracaoValor").textContent = getid("exploracao").value = "";
    getid("rouboValor").textContent = getid("roubo").value = "";
    getid("medicinaValor").textContent = getid("medicina").value = "";

    getid("tormento").value = "";
    getid("habilidades").value = "";
    getid("anotacoes").value = "";
    for(var i=0; i<8; i++) { 
      var p = Number(i)+1;
      getid(`equipamento_${p}`).value = "";
      getid(`dano_${p}`).value = "";
      getid(`bonus_${p}`).value = "";
    }
    getid("reputacaoValor").textContent = getid("reputacao").value = "";
}

function updateTela(person) {
  try {
    getid("char_name").value = person.nome;
    if(!person.nivel) return;
    getid("char_level").value = person.nivel;
    getid("char_vida").value = person.vida;
    getid("char_acoes").value = person.acoes;
    getid("char_def").value = person.defesa;
    getid("char_init").value = person.init;
    getid("money").value = person.dollar;
    getid("recompensa").value = person.recompensa;

    getid("fisicoValor").textContent = getid("fisico").value = person.atributos.fisico;
    getid("intelectoValor").textContent = getid("intelecto").value = person.atributos.intelecto;
    getid("coragemValor").textContent = getid("coragem").value = person.atributos.coragem;
    getid("agilidadeValor").textContent = getid("agilidade").value = person.atributos.agilidade;

    getid("combateValor").textContent = getid("combate").value = person.antecedentes.combate;
    getid("negociosValor").textContent = getid("negocios").value = person.antecedentes.negocios;
    getid("montariaValor").textContent = getid("montaria").value = person.antecedentes.montaria;
    getid("tradicaoValor").textContent = getid("tradicao").value = person.antecedentes.tradicao;
    getid("labutaValor").textContent = getid("labuta").value = person.antecedentes.labuta;
    getid("exploracaoValor").textContent = getid("exploracao").value = person.antecedentes.exploracao;
    getid("rouboValor").textContent = getid("roubo").value = person.antecedentes.roubo;
    getid("medicinaValor").textContent = getid("medicina").value = person.antecedentes.medicina;

    getid("tormento").value = person.tormento;
    getid("habilidades").value = person.habilidades;
    getid("anotacoes").value = person.anotacoes;
    for(i in person.equipamentos) {
      var p = Number(i)+1;
      getid(`equipamento_${p}`).value = person.equipamentos[i].nome;
      getid(`dano_${p}`).value = person.equipamentos[i].dano;
      getid(`bonus_${p}`).value = person.equipamentos[i].bonus;
    }
    getid("reputacaoValor").textContent = getid("reputacao").value = person.reputacao;
  } catch(e) {

  }
}

function selecionaPersonagem(e) {
  selectedId = getid(e.target.id).value
  if(selectedId=="---") {
    clearTela();
  } else {
    const selectedPerson = personasArr.find(persona => persona.id === selectedId);
    console.info(selectedPerson)
    if(selectedPerson) {
      updateTela(selectedPerson.person);
    } else {
      clearTela();
    }
  }
}

function showBox(m) {
  getid("box_results_formula").innerHTML = "";
  getid("box_results_result").innerHTML = m;
  getid("box_results").style.display = "flex";
}

function salvarPersonagem(e) {
  selectedId = getid("personagens").value
  const person = personasArr.find(persona => persona.id === selectedId).person;
  person.nome = getid("char_name").value;
  person.nivel = getid("char_level").value;
  person.vida = getid("char_vida").value ;
  person.acoes = getid("char_acoes").value ;
  person.defesa = getid("char_def").value;
  person.init = getid("char_init").value ;
  person.dollar = getid("money").value;
  person.recompensa = getid("recompensa").value;
  if(!person.atributos) person.atributos = {}
  person.atributos.fisico = getid("fisico").value;
  person.atributos.intelecto = getid("intelecto").value;
  person.atributos.coragem = getid("coragem").value;
  person.atributos.agilidade = getid("agilidade").value;
  if(!person.antecedentes) person.antecedentes = {}
  person.antecedentes.combate = getid("combate").value;
  person.antecedentes.negocios = getid("negocios").value;
  person.antecedentes.montaria = getid("montaria").value;
  person.antecedentes.tradicao = getid("tradicao").value;
  person.antecedentes.labuta = getid("labuta").value;
  person.antecedentes.exploracao = getid("exploracao").value;
  person.antecedentes.roubo = getid("roubo").value;
  person.antecedentes.medicina = getid("medicina").value;
  person.tormento =getid("tormento").value;
  person.habilidades = getid("habilidades").value;
  person.anotacoes = getid("anotacoes").value;
  person.reputacao = getid("reputacao").value;
  person.userId = oid
  person.equipamentos = []
  for(let j=0; j<8; j++) {
    var p = Number(j)+1;
    person.equipamentos.push({
      nome: getid(`equipamento_${p}`).value,
      dano: getid(`dano_${p}`).value,
      bonus: getid(`bonus_${p}`).value
    })
  }

  fetch('/salvar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_idToken}`
    },
    body: JSON.stringify({
      documentId: selectedId,
      dados: person,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      getid("personagens").textContent = "";
      createSelect();
      getid("personagens").value = data.id;
      showBox("Personagem modificado com successo.")
    } else {
      console.info('Erro ao salvar dados: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function addPersonagem(e){
  console.info(oid);
  fetch('/add', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_idToken}`
    },
    body: JSON.stringify({
      userId: oid
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      clearTela();
      var opt = document.createElement("option")
      opt.value = data.id;
      opt.textContent = data.nome;
      getid("personagens").appendChild(opt);
      personasArr.push({id:data.id, person:{nome:data.nome}})
      getid("personagens").value = data.id;
      getid("char_name").value = data.nome;
      showBox("Personagem criado.");
    } else {
      console.info('Erro ao salvar dados: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function removePersonagem(e){
  selectedId = getid("personagens").value
  fetch('/del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_idToken}`
    },
    body: JSON.stringify({
      documentId: selectedId
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showBox("Personagem apagado.");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000)
    } else {
      console.info('Erro ao salvar dados: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function createSelect(e) {
  for(i in personasArr) {
    var opt = document.createElement("option")
    opt.value = personasArr[i].id;
    opt.textContent = personasArr[i].person.nome;
    getid("personagens").appendChild(opt)
  }
}

var arrBtns = document.getElementsByClassName("icon-dice");
for(var i=0; i<arrBtns.length; i++) {
  var bt = arrBtns[i];
  var lab = bt.id.split("roll-").join("");
  getid(lab).addEventListener('input', (e) => atualizarValor(e.target.id.split("roll-").join(""), `${e.target.id.split("roll-").join("")}Valor`));
}

window.onload = function(){ 
  getid("app").style.display = "none";
  getid("personagens").addEventListener('change', selecionaPersonagem);
  getid("remove").addEventListener('click', removePersonagem);
  getid("add").addEventListener('click', addPersonagem);
  getid("salvar").addEventListener('click', salvarPersonagem);
}