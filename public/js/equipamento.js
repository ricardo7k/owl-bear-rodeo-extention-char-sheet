function startEquipamento(){
  console.info("============> startEquipamento");
  var nequip = 8;
  for(var i = 1; i<nequip+1; i++) {
    var content = document.createElement("div");
    var equipa = document.createElement("div");
    var input = document.createElement("input");
    var level = document.createElement("div");
    var lvl_input = document.createElement("input");
    var bonus = document.createElement("div");
    var bns_input = document.createElement("input");
    var roll_bt = document.createElement("span");

    input.type = "text";
    input.name = `equipamento_${i}`;
    input.id = `equipamento_${i}`;
    input.value = "";

    lvl_input.type = "text";
    lvl_input.name = `dano_${i}`;
    lvl_input.id = `dano_${i}`;
    lvl_input.value = "";

    bns_input.type = "text";
    bns_input.name = `bonus_${i}`;
    bns_input.id = `bonus_${i}`;
    bns_input.value = "";

    roll_bt.id = `roll-equipamento_${i}`;
    roll_bt.className = "icon-dice-equip";

    content.className = "content-box";
    equipa.className = "name-box";
    level.className = "level-box";
    bonus.className = "level-box";

    equipa.appendChild(input);
    level.appendChild(lvl_input);
    bonus.appendChild(bns_input);

    content.appendChild(equipa);
    content.appendChild(level);
    content.appendChild(bonus);
    content.appendChild(roll_bt);

    getclass("equip-box")[0].appendChild(content);
  }
}
