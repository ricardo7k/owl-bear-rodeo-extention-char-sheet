import OBR from "https://cdn.skypack.dev/@owlbear-rodeo/sdk";

var rolagem = "Carregando";
var bonus = "0";
export function createOBRNotification() {
  OBR.onReady(async () => {
    OBR.scene.onReadyChange((ready) => {
      if (ready) {
        var m = "2d6@1,1"
        OBR.scene.onMetadataChange((metadata) => {
          var aurl = encodeURI("/pop/"+ metadata["im.rfo/sheet"].roll.split("@")[0]);
          OBR.popover.open({
            id: "rfo.im",
            url: aurl,
            width: 330,
            height: 330,
            anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" }
          });
        });
      } else {
        console.info("SCENE NOK")
      }
    })
  })
}
createOBRNotification()

export function showOBRNotification(m, _rolagem, _bonus) {
  rolagem = _rolagem;
  bonus = _bonus;
  OBR.onReady(async () => {
    OBR.scene.setMetadata({ "im.rfo/sheet": { 
        roll: `${m}#__${Math.random()}#`,
        rolagem: rolagem,
        bonus: bonus
      } 
    });
  });
}
