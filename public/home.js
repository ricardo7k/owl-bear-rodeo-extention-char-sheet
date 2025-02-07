function atualizarValor(sliderId, valorId) {
  const slider = document.getElementById(sliderId);
  const valor = document.getElementById(valorId);
  valor.textContent = slider.value;
}

function geid(id) {
 return document.querySelector("#" + id);
}

function clearTela() {
    geid("char_name").value = "";
    geid("char_level").value = "";
    geid("char_vida").value = "";
    geid("char_acoes").value = "";
    geid("char_def").value = "";
    geid("char_init").value = "";
    geid("money").value = "";
    geid("recompensa").value = "";

    geid("fisicoValor").textContent = geid("fisico").value = "";
    geid("intelectoValor").textContent = geid("intelecto").value = "";
    geid("coragemValor").textContent = geid("coragem").value = "";
    geid("agilidadeValor").textContent = geid("agilidade").value = "";

    geid("combateValor").textContent = geid("combate").value = "";
    geid("negociosValor").textContent = geid("negocios").value = "";
    geid("montariaValor").textContent = geid("montaria").value = "";
    geid("tradicaoValor").textContent = geid("tradicao").value = "";
    geid("labutaValor").textContent = geid("labuta").value = "";
    geid("exploracaoValor").textContent = geid("exploracao").value = "";
    geid("rouboValor").textContent = geid("roubo").value = "";
    geid("medicinaValor").textContent = geid("medicina").value = "";

    geid("tormento").value = "";
    geid("habilidades").value = "";
    geid("anotacoes").value = "";
    for(var i=0; i<8; i++) { 
      var p = Number(i)+1;
      geid(`equipamento_${p}`).value = "";
      geid(`dano_${p}`).value = "";
      geid(`bonus_${p}`).value = "";
    }
    geid("reputacaoValor").textContent = geid("reputacao").value = "";
}

function updateTela(person) {
  try {
    geid("char_name").value = person.nome;
    if(!person.nivel) return;
    geid("char_level").value = person.nivel;
    geid("char_vida").value = person.vida;
    geid("char_acoes").value = person.acoes;
    geid("char_def").value = person.defesa;
    geid("char_init").value = person.init;
    geid("money").value = person.dollar;
    geid("recompensa").value = person.recompensa;

    geid("fisicoValor").textContent = geid("fisico").value = person.atributos.fisico;
    geid("intelectoValor").textContent = geid("intelecto").value = person.atributos.intelecto;
    geid("coragemValor").textContent = geid("coragem").value = person.atributos.coragem;
    geid("agilidadeValor").textContent = geid("agilidade").value = person.atributos.agilidade;

    geid("combateValor").textContent = geid("combate").value = person.antecedentes.combate;
    geid("negociosValor").textContent = geid("negocios").value = person.antecedentes.negocios;
    geid("montariaValor").textContent = geid("montaria").value = person.antecedentes.montaria;
    geid("tradicaoValor").textContent = geid("tradicao").value = person.antecedentes.tradicao;
    geid("labutaValor").textContent = geid("labuta").value = person.antecedentes.labuta;
    geid("exploracaoValor").textContent = geid("exploracao").value = person.antecedentes.exploracao;
    geid("rouboValor").textContent = geid("roubo").value = person.antecedentes.roubo;
    geid("medicinaValor").textContent = geid("medicina").value = person.antecedentes.medicina;

    geid("tormento").value = person.tormento;
    geid("habilidades").value = person.habilidades;
    geid("anotacoes").value = person.anotacoes;
    for(i in person.equipamentos) {
      var p = Number(i)+1;
      geid(`equipamento_${p}`).value = person.equipamentos[i].nome;
      geid(`dano_${p}`).value = person.equipamentos[i].dano;
      geid(`bonus_${p}`).value = person.equipamentos[i].bonus;
    }
    geid("reputacaoValor").textContent = geid("reputacao").value = person.reputacao;
  } catch(e) {

  }
}

function selecionaPersonagem(e) {
  selectedId = geid(e.target.id).value
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

function salvarPersonagem(e) {
  selectedId = geid("personagens").value
  const person = personasArr.find(persona => persona.id === selectedId).person;
  person.nome = geid("char_name").value;
  person.nivel = geid("char_level").value;
  person.vida = geid("char_vida").value ;
  person.acoes = geid("char_acoes").value ;
  person.defesa = geid("char_def").value;
  person.init = geid("char_init").value ;
  person.dollar = geid("money").value;
  person.recompensa = geid("recompensa").value;
  if(!person.atributos) person.atributos = {}
  person.atributos.fisico = geid("fisico").value;
  person.atributos.intelecto = geid("intelecto").value;
  person.atributos.coragem = geid("coragem").value;
  person.atributos.agilidade = geid("agilidade").value;
  if(!person.antecedentes) person.antecedentes = {}
  person.antecedentes.combate = geid("combate").value;
  person.antecedentes.negocios = geid("negocios").value;
  person.antecedentes.montaria = geid("montaria").value;
  person.antecedentes.tradicao = geid("tradicao").value;
  person.antecedentes.labuta = geid("labuta").value;
  person.antecedentes.exploracao = geid("exploracao").value;
  person.antecedentes.roubo = geid("roubo").value;
  person.antecedentes.medicina = geid("medicina").value;
  person.tormento =geid("tormento").value;
  person.habilidades = geid("habilidades").value;
  person.anotacoes = geid("anotacoes").value;
  person.reputacao = geid("reputacao").value;
  person.equipamentos = []
  for(let j=0; j<8; j++) {
    var p = Number(j)+1;
    person.equipamentos.push({
      nome: geid(`equipamento_${p}`).value,
      dano: geid(`dano_${p}`).value,
      bonus: geid(`bonus_${p}`).value
    })
  }

  fetch('/salvar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      documentId: selectedId,
      dados: person,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      geid("personagens").textContent = "";
      createSelect();
      geid("personagens").value = data.id;
    } else {
      console.info('Erro ao salvar dados: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function addPersonagem(e){
  fetch('/add', { 
    method: 'POST',
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      clearTela();
      var opt = document.createElement("option")
      opt.value = data.id;
      opt.textContent = data.nome;
      geid("personagens").appendChild(opt);
      personasArr.push({id:data.id, person:{nome:data.nome}})
      geid("personagens").value = data.id;
      geid("char_name").value = data.nome;
    } else {
      console.info('Erro ao salvar dados: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });
}

function removePersonagem(e){
  selectedId = geid("personagens").value
  fetch('/del', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      documentId: selectedId
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = "/";
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
    geid("personagens").appendChild(opt)
  }
}

var arrBtns = document.getElementsByClassName("icon-dice");
for(var i=0; i<arrBtns.length; i++) {
  var bt = arrBtns[i];
  var lab = bt.id.split("roll-").join("");
  geid(lab).addEventListener('input', (e) => atualizarValor(e.target.id.split("roll-").join(""), `${e.target.id.split("roll-").join("")}Valor`));
}

window.onload = function(){ 
  geid("app").style.display = "none";
  geid("personagens").addEventListener('change', selecionaPersonagem);
  geid("remove").addEventListener('click', removePersonagem);
  geid("add").addEventListener('click', addPersonagem);
  geid("salvar").addEventListener('click', salvarPersonagem);
  createSelect();
}