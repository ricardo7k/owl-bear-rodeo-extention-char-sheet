import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, where, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDH0uItqT3qcq9iQM450yTn7z4zX06wlhc",
  authDomain: "fir-owl-d0a23.firebaseapp.com",
  projectId: "fir-owl-d0a23",
  storageBucket: "fir-owl-d0a23.firebasestorage.app",
  messagingSenderId: "240580388131",
  appId: "1:240580388131:web:1336676c47b8e746d2d896"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
var ntimes = 0;

async function googleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      readData();
    } catch (error) {
        alert("Erro ao fazer login: " + error.message);
    }
}

async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        alert("Erro ao fazer logout: " + error);
    }
}

export async function readData(pagina) {
  //console.info("============> readData");
  personasArr = [];
  const idToken = await auth.currentUser.getIdToken();
  fetch('/list', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${idToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    ntimes+=1;
    if(ntimes==1) {
      personasArr = [];
      ntimes=0
      _idToken = idToken;
      window.userId = data.userId;
      personasArr = data.personas;
      if(personasArr.length>0) {
        getid("personagens").style.display = "block";
        getid("personagens").selectedIndex = 0;
        setTimeout(()=>{
          getid("personagens").dispatchEvent(new Event("change"), selecionaPersonagem);
        }, 50);
        getid("planilha").style.display= "block";
      } else  {
        getid("planilha").style.display= "none";
        getid("personagens").style.display = "none";
        getid("remove").style.display = "none";
      }
      getid("add").style.display = "block";
      getid("login-container").style.display = "none";
      //console.info("============> readData sheets loaded try createSelect");
      if(!window.OWLCSCreatedSelect) createSelect(pagina||null);
    }
    getid("overblock").style.display = "none";
  })
}

function initAuth() {
  //console.info("============> initAuth");
  onAuthStateChanged(auth, (user) => {
    //console.info("============> onAuthStateChanged");
    if(user){
      //console.info("============> onAuthStateChanged user");
      oid = user.uid;
      window.readData = readData;
      readData("HOME");
    } else {
      //console.info("============> onAuthStateChanged !user");
      getid("overblock").style.display = "none";
      startHome();
      console.info("Nenhum usuário autenticado.");
    }
  });
  getid('google-login-button').addEventListener('click', googleLogin);
}

window.initAuthGoogleAuthentication = initAuth;