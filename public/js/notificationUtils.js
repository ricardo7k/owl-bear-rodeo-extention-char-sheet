import OBR from "https://cdn.skypack.dev/@owlbear-rodeo/sdk";

var sheet = {};

OBR.onReady(async (e) => {
  OBR.scene.onReadyChange((ready) => {
      OBR.scene.onMetadataChange((metadata) => {
        showPopover(`/pop/${metadata["im.rfo/sheet"].roll.split("@")[0]}`);
      });
  });
  OBR.action.onOpenChange((isOpen) => {
    if(isOpen) {
      try {
        OBR.scene.getMetadata()
        .then(data=>{
          console.info("** 📒 $","Owlbear Rodeo Scene metadata is ready ✅:", data);
        });
      } catch (e) {
        console.error(e);
      }
    }
  })
})

function showPopover(_url) {
  OBR.popover.open({
    id: "rfo.im",
    url: _url,
    width: 330,
    height: 330,
    anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" }
  });
}

export function showOBRNotification(m, _rolagem, _bonus) {
  console.info("** 🎲 Rolagem de dado:", m, _rolagem, _bonus);
  var $rolagem = _rolagem;
  var $bonus = _bonus;
  OBR.onReady(async () => {
    OBR.scene.setMetadata({ "im.rfo/sheet": { 
        roll: `${m}#__${Math.random()}#`,
        rolagem: `${$rolagem}`,
        bonus: `${$bonus}`
      } 
    });
  });
}
