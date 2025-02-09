      //console.info("============> Module")
      import OBR from "https://cdn.skypack.dev/@owlbear-rodeo/sdk";
      function showPopover(_url) {
        //console.info("============> showPopover");
        OBR.popover.open({
          id: "rfo.im",
          url: _url,
          width: 330,
          height: 330,
          anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" }
        });
      }

      function showOBRNotification(m, _rolagem, _bonus) {
        console.info("** 🎲 Rolagem de dado:", m, _rolagem, _bonus);
        var $rolagem = _rolagem;
        var $bonus = _bonus;
        try{
          OBR.scene.setMetadata({ "im.rfo/sheet": { 
              roll: `${m}#__${Math.random()}#`,
              rolagem: `${$rolagem}`,
              bonus: `${$bonus}`
            } 
          }).then(() =>{
            //console.info("============> METADATA CHANGED")

            OBR.scene.getMetadata()
            .then(data=>{
              console.info("** 📒 $","Owlbear Rodeo Scene metadata is ready ✅:", data);
            });

          });
        } catch(error) {
          console.error("============> Erro showOBRNotification", error);
        } 
      }
      window.onload = (event) => {
        window.showOBRNotification = showOBRNotification;
        //console.info("============> Module Window load");
        OBR.onReady(()=>{
          //console.info("============> OBR.onReady");
          OBR.action.onOpenChange((isOpen) => {
            //console.info("============> OBR.onOpenChange");
            if(isOpen) {
              //console.info("============> OBR.onOpenChange isOpen");
              try {
                //console.info("============> Try OBR.scene.getMetadata");
                OBR.scene.getMetadata()
                .then(data=>{
                  OBR.scene.onMetadataChange((metadata) => {
                    //console.info("============> OBR.scene.onMetadataChange");
                    showPopover(`/pop/${metadata["im.rfo/sheet"].roll.split("@")[0]}`);
                  });
                  console.info("** 📒 $","Owlbear Rodeo Scene metadata is ready ✅:", data);
                  //console.info("============> Try window.initAuthGoogleAuthentication");
                  window.initAuthGoogleAuthentication();
                });
              } catch (e) {
                console.error("** 💾 $","Try Error OBR.scene.getMetadata ❌:", e);
                console.error(e);
              }
            }
          })
        })
      }
