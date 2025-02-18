import DiceBox from "/js/dice-box-threejs.es.js";

var bonus = 0;
var rolagem = "";
var Box = {};
var url_random = "https://www.random.org/integers/?min=1&col=1&base=10&format=plain&rnd=new";

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); 
}

//#FAIR RANDOM 
function randomNum(n,d) {
  return new Promise((resolve, reject) => {
    fetch(`${url_random}&num=${n}&max=${d}`, { method: 'GET' })
    .then(response => response.text())
    .then(data => {
      var a = data.split('\n');
      a = a.slice(0,a.length-1);
      if(a){
        resolve(a);
      } else {
        reject("Erro no random.");
      }
    })
  });
}

function somarRolagens(dados, bonus) {
  // 1. Extrair informações da string 'dados'
  const [dadosStr, resultadosStr] = dados.split('@');
  const [numDados, facesDado] = dadosStr.split('d').map(Number);

  // Trata casos onde não há 'd' ou número de dados explicitamente.
  const numDadosFinal = isNaN(numDados) ? 1 : numDados;
  const facesDadoFinal = isNaN(facesDado) ? (isNaN(numDados) ? null : numDados) : facesDado;

  if (facesDadoFinal === null) {
      return NaN; // Formato inválido (ex: "@1,2")
  }

  // 2. Processar os resultados da rolagem
  const resultados = resultadosStr.split(',').map(Number);

  // 3. Validar os resultados
  if (resultados.some(isNaN)) {
      return NaN; // Se algum resultado não for um número, retorna NaN
  }
  if (resultados.length !== numDadosFinal) {
    //  return NaN;  // Número incorreto de resultados.  Removido para permitir casos como 2d6@5 (um dos dados deu 5, o outro não importa)
  }

  // 4. Calcular a soma das rolagens
  const somaRolagens = resultados.reduce((sum, val) => sum + val, 0);


  // 5. Processar o bônus
  const bonusNumerico = parseInt(bonus, 10);
  if (isNaN(bonusNumerico)) {
      return NaN; // Bônus inválido
  }

  // 6. Calcular o total final
  const totalFinal = somaRolagens + bonusNumerico;

   return {
      numDados: numDadosFinal,
      facesDado: facesDadoFinal,
      resultados: resultados,
      somaRolagens: somaRolagens,
      bonus: bonusNumerico,
      total: totalFinal
  };
}

function acaoDado(roll, rolagem, bonus, lab) {
  getid("app").style.top = 0;
  window.showOBRNotification(roll, rolagem, bonus);
  Box.roll(roll);
  window.addMessage(
    getid("char_name").value, 
    window.userId, 
    `<span>${lab} | ${roll.split("@")[0]} + (${bonus}):</span> 
    ${somarRolagens(roll, bonus).resultados.join(" + ")} + 
    (${somarRolagens(roll, bonus).bonus}) =
    ${somarRolagens(roll, bonus).total}`
  );
}

function rollAttr(e){
  var lab = (e.target.id=="roll-combate1")?"combate":e.target.id.split("roll-").join("")
  bonus = getid(lab).value;
  rolagem = getid("char_name").value + " - " + cap(lab);
  randomNum(1,6).then((data)=>{
    acaoDado(`1d6@${data}`, rolagem, bonus, cap(lab));
  });
}

function rollAttrEquip(e){
  var lab = e.target.id.split("roll-").join("");
  var num = getid(lab).id.split("equipamento_").join("");
  bonus = getid(`bonus_${num}`).value;
  var dice = getid(`dano_${num}`).value;
  rolagem = getid("char_name").value + " - " + cap(getid(lab).value);
  var a = dice.split("d");
  randomNum(a[0],a[1]).then((data)=>{
    acaoDado(`${dice}@${data}`, rolagem, bonus, cap(getid(lab).value));
  });
}

function rollAttrSolo(e){
  var lab = "Custom Roll"
  bonus = 0;
  rolagem = getid("char_name").value + " - " + cap(lab);
  var dice = getid(`char_dados`).value;
  randomNum(dice,"6").then((data)=>{
    window.showOBRNotification(`${dice}d6@${data}`, rolagem, bonus);
    acaoDado(`${dice}d6@${data}`, rolagem, bonus, cap(lab));
  });
}

function clearTable(e) {
  //console.info("============> CLEAR TABLE")
  getid("box_results").style.display = "none";
  getid("app").style.top = "-100vh";
  document.getElementsByTagName("canvas")[0].removeEventListener("click", clearTable);
}

function initDice() {
  //console.info("============> initDice");
  //Buttons
  var arrBtns = document.getElementsByClassName("icon-dice");
  for(var i=0; i<arrBtns.length; i++) {
    var bt = arrBtns[i];
    bt.addEventListener('click', rollAttr);
  }

  var arrBtnsEquip = document.getElementsByClassName("icon-dice-equip");

  for(var i=0; i<arrBtnsEquip.length; i++) {
    var bt = arrBtnsEquip[i];
    bt.addEventListener('click', rollAttrEquip);
  }
  if(document.getElementsByClassName("icon-dice-solo")[0]) document.getElementsByClassName("icon-dice-solo")[0].addEventListener('click', rollAttrSolo);
  if(getid("box_results")) getid("box_results").addEventListener("click", clearTable);

  Box = new DiceBox("#app", {
    theme_customColorset: {
      background: "#5C4033",
      foreground: "#FFCC00",
      texture: "wood",
      material: "wood",
    },
    light_intensity: 1,
    gravity_multiplier: 600,
    baseScale: 100,
    strength: 1,
    onRollComplete: (results) => {
      var forumla = `<p><span>${rolagem} | ${results.notation.split("@")[0]}+(${bonus}) :</span></p>`
      var oresultado = "";
      var total = 0;
      for(var i=0;i<results.result.length; i++){
        var dist = i==results.result.length-1?"":"+";
        oresultado += `${results.result[i]}${dist}`;
        total += Number(results.result[i]);
      }
      total += Number(bonus)

      getid("box_results_formula").innerHTML = `${forumla}`;
      getid("box_results_result").innerHTML = `${oresultado}+(${bonus})=${total}`;
      getid("box_results").style.display = "flex";
      document.getElementsByTagName("canvas")[0].addEventListener("click", clearTable);
    },
  });
  //console.info("============> Try Box Intialization");
  Box.initialize().then((e) => { 
    window.diceStarted = true;
    clearTable();
    //console.info("============> Box Intialized");
  });
}

window.initDice = initDice;
window.acaoDado = acaoDado;
window.randomNum = randomNum;