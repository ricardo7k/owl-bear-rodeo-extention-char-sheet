
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

    getid("horse_name").value = "";
    getid("fid_level").value = "";
    getid("potencia").value = "";
    getid("vigor").value = "";
    getid("horse-equip").value = "";

    getid("horse-vida").value = "";
    getid("horse-def").value = "";
    getid("horse-dano").value = "";

    for(var i=0; i<4; i++) {
      getid(`fids${i+1}`).checked = false;
    }

}

function updateTela(person) {
    getid("char_name").value = person.nome || "";

    getid("char_level").value = person.nivel || "";
    getid("char_vida").value = person.vida || "";
    getid("char_acoes").value = person.acoes || "";
    getid("char_def").value = person.defesa || "";
    getid("char_init").value = person.init || "";
    getid("money").value = person.dollar || "";
    getid("recompensa").value = person.recompensa || "";

    if(person.atributos) {
      getid("fisicoValor").textContent = getid("fisico").value = person.atributos.fisico || "";
      getid("intelectoValor").textContent = getid("intelecto").value = person.atributos.intelecto || "";
      getid("coragemValor").textContent = getid("coragem").value = person.atributos.coragem || "";
      getid("agilidadeValor").textContent = getid("agilidade").value = person.atributos.agilidade || "";
    }

    if(person.antecedentes) {
      getid("combateValor").textContent = getid("combate").value = person.antecedentes.combate || "";
      getid("negociosValor").textContent = getid("negocios").value = person.antecedentes.negocios || "";
      getid("montariaValor").textContent = getid("montaria").value = person.antecedentes.montaria || "";
      getid("tradicaoValor").textContent = getid("tradicao").value = person.antecedentes.tradicao || "";
      getid("labutaValor").textContent = getid("labuta").value = person.antecedentes.labuta || "";
      getid("exploracaoValor").textContent = getid("exploracao").value = person.antecedentes.exploracao || "";
      getid("rouboValor").textContent = getid("roubo").value = person.antecedentes.roubo || "";
      getid("medicinaValor").textContent = getid("medicina").value = person.antecedentes.medicina || "";
    }

    getid("tormento").value = person.tormento || "";
    getid("habilidades").value = person.habilidades || "";
    getid("anotacoes").value = person.anotacoes || "";
    for(i in person.equipamentos) {
      var p = Number(i)+1;
      getid(`equipamento_${p}`).value = person.equipamentos[i].nome || "";
      getid(`dano_${p}`).value = person.equipamentos[i].dano || "";
      getid(`bonus_${p}`).value = person.equipamentos[i].bonus || "";
    }
    getid("reputacaoValor").textContent = getid("reputacao").value = person.reputacao || "";

    if(person.cavalo) {
      getid("horse_name").value = person.cavalo.nome;
      getid("fid_level").value = person.cavalo.fidelity;
      getid("potencia").value = person.cavalo.potencia;
      getid("vigor").value = person.cavalo.vigor;
      getid("horse-equip").value = person.cavalo.equipamento;
      getid("horse-vida").value = person.cavalo.vida;
      getid("horse-def").value = person.cavalo.defesa;
      getid("horse-dano").value = person.cavalo.dano;
    if(person.cavalo.fidelity) {
        for(var i=0; i<4; i++) {
          if(i<person.cavalo.fidelity) getid(`fids${i+1}`).checked = true;
        }
      }
    }
}

function selecionaPersonagem(e) {
  clearTela();
  selectedId = getid(e.target.id).value
  const selectedPerson = personasArr.find(persona => persona.id === selectedId);
  if(selectedPerson) {
    updateTela(selectedPerson.person);
    getid("remove").style.display = "block";
    getid("planilha").style.display = "block";
  }
}

function showBox(m) {
  getid("box_results_formula").innerHTML = "";
  getid("box_results_result").innerHTML = m;
  getid("box_results").style.display = "flex";
}

function salvarPersonagem(e) {
  getid("overblock").style.display = "flex";
  selectedId = getid("personagens").value
  var oidx = getid("personagens").selectedIndex
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
  person.tormento = getid("tormento").value;
  person.habilidades = getid("habilidades").value;
  person.anotacoes = getid("anotacoes").value;
  person.reputacao = getid("reputacao").value;
  person.userId = getid("personagens").childNodes[getid("personagens").selectedIndex].getAttribute("data-userId");
  person.equipamentos = []
  for(let j=0; j<8; j++) {
    var p = Number(j)+1;
    person.equipamentos.push({
      nome: getid(`equipamento_${p}`).value,
      dano: getid(`dano_${p}`).value,
      bonus: getid(`bonus_${p}`).value
    })
  }
  if(!person.cavalo) person.cavalo = {}
  person.cavalo.nome = getid("horse_name").value;
  person.cavalo.fidelity = getid("fid_level").value;
  person.cavalo.potencia = getid("potencia").value;
  person.cavalo.vigor = getid("vigor").value;
  person.cavalo.equipamento = getid("horse-equip").value;

  person.cavalo.vida = getid("horse-vida").value;
  person.cavalo.defesa = getid("horse-def").value;
  person.cavalo.dano = getid("horse-dano").value;
  
  fetch('/salvar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_idToken}`
    },
    body: JSON.stringify({
      documentId: selectedId,
      dados: person,
      userId: window.userId
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // createSelect();
      // getid("personagens").value = data.id;
      showBox("Personagem modificado com successo.");
      getid("overblock").style.display = "none";
      getid("personagens").selectedIndex = oidx;
      setTimeout(()=>{
        getid("personagens").dispatchEvent(new Event("change"), selecionaPersonagem);
      }, 100);
    } else {
      console.info("** 💾 $","Erro ao salvar dados ❌:", data.error);
    }
  })
  .catch(error => {
    console.info("** 💾 $","Erro na requisição ❌:", error);
  });
}

function addPersonagem(e){
  getid("overblock").style.display = "flex";
  clearTela();
  fetch('/name', { 
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    fetch(`/history/${data.name}`, { 
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      fetch('/add', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${_idToken}`
        },
        body: JSON.stringify({
          userId: window.userId,
          name: data.name,
          history: data.history
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          var opt = document.createElement("option")
          opt.value = data.id;
          opt.textContent = data.nome;
          const oidx = getid("personagens").appendChild(opt);
          personasArr.push({id:data.id, person:{nome:data.nome, anotacoes:data.anotacoes}})
          getid("personagens").value = data.id;
          getid("anotacoes").value = String(data.anotacoes);
          getid("char_name").value = data.nome;
          showBox("Personagem criado.");
          getid("personagens").style.display = "block";
          getid("personagens").selectedIndex = oidx.index;
          setTimeout(()=>{
            getid("personagens").dispatchEvent(new Event("change"), selecionaPersonagem);
          }, 100);
          getid("overblock").style.display = "none";
        } else {
          console.error("** 💾 $","Erro ao salvar dados ❌:", data.error);
        }
      })
      .catch(error => {
        console.error("** 💾 $","Erro na requisição ❌:", error);
      });    
    })
    .catch(error => {
      console.error("** 💾 $","Erro na requisição ❌:", error);
    });
  })
  .catch(error => {
    console.error("** 💾 $","Erro na requisição ❌:", error);
  });
}

function removePersonagem(e){
  getid("overblock").style.display = "flex";
  window.OWLCSCreatedSelect = false;
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
      personasArr = [];
      getid("personagens").innerHTML = "";
      clearTela();
      window.readData();
    } else {
      console.info("** 💾 $","Erro ao salvar dados ❌:", data.error);
    }
  })
  .catch(error => {
    console.error("** 💾 $","Erro na requisição ❌:", error);
  });
}

function createSelect(pagina) {
  //console.info("============> createSelect");
  getid("personagens").textContent = "";
  for(i in personasArr) {
    var opt = document.createElement("option")
    opt.value = personasArr[i].id;
    opt.setAttribute("data-userId", personasArr[i].person.userId);
    opt.textContent = personasArr[i].person.nome;
    getid("personagens").appendChild(opt)
  }
  getid("personagens").selectedIndex = 0;
  getid("personagens").dispatchEvent(new Event("change"), selecionaPersonagem);
  //console.info(`============> createSelect try pagina HOME? (${pagina=="HOME"} && OWLCSHomeStarted? ${window.OWLCSHomeStarted}`);
  //console.info("============> createSelect Done");
  window.OWLCSCreatedSelect = true;
  if(pagina=="HOME" && !window.OWLCSHomeStarted) startHome();

  for(var i=0; i<4; i++) {
    getid(`fids${i+1}`).addEventListener('click', (e) => {
      getid(`fid_level`).value = e.target.name.split("fids").join("");
      for(var j=0; j<4; j++) {
        getid(`fids${j+1}`).checked = false;
        if(j<getid(`fid_level`).value) {
          getid(`fids${j+1}`).checked = true;
        }
      }
    })
  }

  //console.info("============> Try create window.initDice ");
  if(!window.diceStarted) window.initDice();
}

function startHome() {
  window.OWLCSHomeStarted = true;
  //console.info("============> Home startHome");
  var arrBtns = document.getElementsByClassName("icon-dice");
  for(var i=0; i<arrBtns.length; i++) {
    var bt = arrBtns[i];
    var lab = bt.id.split("roll-").join("");
    if(arrBtns[i].id!="roll-combate1") getid(lab).addEventListener('input', (e) => atualizarValor(e.target.id.split("roll-").join(""), `${e.target.id.split("roll-").join("")}Valor`));
  }
  getid("personagens").addEventListener('change', selecionaPersonagem);
  getid("remove").addEventListener('click', removePersonagem);
  getid("add").addEventListener('click', addPersonagem);
  getid("salvar").addEventListener('click', salvarPersonagem);
  //console.info("============> Try startEquipamento");
  startEquipamento();
}