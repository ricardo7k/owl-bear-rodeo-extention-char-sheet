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

function acaoDado(roll, rolagem, bonus) {
  getid("app").style.top = 0;
  window.showOBRNotification(roll, rolagem, bonus);
  Box.roll(roll);
}

function rollAttr(e){
  var lab = (e.target.id=="roll-combate1")?"combate":e.target.id.split("roll-").join("")
  bonus = getid(lab).value;
  rolagem = getid("char_name").value + " - " + cap(lab);
  randomNum(1,6).then((data)=>{
    acaoDado(`1d6@${data}`, rolagem, bonus);
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
    acaoDado(`${dice}@${data}`, rolagem, bonus);
  });
}

function rollAttrSolo(e){
  var lab = "Custom Roll"
  bonus = 0;
  rolagem = getid("char_name").value + " - " + cap(lab);
  var dice = getid(`char_dados`).value;
  randomNum(dice,"6").then((data)=>{
    window.showOBRNotification(`${dice}d6@${data}`, rolagem, bonus);
    acaoDado(`${dice}d6@${data}`, rolagem, bonus);
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
