import DiceBox from "/js/dice-box-threejs.es.js";
import { showOBRNotification } from "/js/notificationUtils.js";
import { createOBRNotification } from "/js/notificationUtils.js";

var bonus = 0;
var rolagem = "";

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1); 
}

function rollAttr(e){
  getid("app").style.display = "block";
  var lab = e.target.id.split("roll-").join("")
  bonus = getid(lab).value;
  rolagem = getid("char_name").value + " - " + cap(lab);
  const values = [1, 2, 3, 4, 5, 6];
  const randomVal = values[Math.floor(Math.random() * values.length)];
  Box.roll(`1d6@${randomVal}`);
  showOBRNotification(`1d6@${randomVal}`, rolagem, bonus);
}

function rollAttrEquip(e){
  getid("app").style.display = "block";
  var lab = e.target.id.split("roll-").join("");
  var num = getid(lab).id.split("equipamento_").join("");
  bonus = getid(`bonus_${num}`).value;
  var dice = getid(`dano_${num}`).value;
  rolagem = getid("char_name").value + " - " + cap(getid(lab).value);
  const values = dice.split("d")[0].split("@")[0]==6?[1, 2, 3, 4, 5, 6]:[1, 2, 3];
  var randomVal = "";
  for(i=0;i<Number(dice.split("d")[0]);i++) {
    var dist = i==Number(dice.split("d")[0])-1?"":",";
    randomVal += values[Math.floor(Math.random() * values.length)] + dist;
  }
  Box.roll(`${dice}@${randomVal}`)
  showOBRNotification(`${dice}@${randomVal}`, rolagem, bonus);
}

function rollAttrSolo(e){
  getid("app").style.display = "block";
  var lab = "Custom Roll"
  bonus = 0;
  rolagem = getid("char_name").value + " - " + cap(lab);
  var dice = getid(`char_dados`).value;
  const values = [1, 2, 3, 4, 5, 6];
  var randomVal = "";
  for(i=0;i<Number(dice.split("d")[0]);i++) {
    var dist = i==Number(dice.split("d")[0])-1?"":",";
    randomVal += values[Math.floor(Math.random() * values.length)] + dist;
  }
  Box.roll(`${dice}d6@${randomVal}`)
  showOBRNotification(`${dice}d6@${randomVal}`, rolagem, bonus);
}

function clearTable(e) {
  getid("box_results").style.display = "none";
  getid("app").style.display = "none";
  document.getElementsByTagName("canvas")[0].removeEventListener("click", clearTable);
}

const Box = new DiceBox("#app", {
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
Box.initialize();
createOBRNotification();

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
