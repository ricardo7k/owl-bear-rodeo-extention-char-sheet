import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, where, getDocs, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDH0uItqT3qcq9iQM450yTn7z4zX06wlhc",
  authDomain: "fir-owl-d0a23.firebaseapp.com",
  projectId: "fir-owl-d0a23",
  storageBucket: "fir-owl-d0a23.firebasestorage.app",
  messagingSenderId: "240580388131",
  appId: "1:240580388131:web:6f735b177662015bd2d896"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

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

export async function readData() {
  const idToken = await auth.currentUser.getIdToken();
  const response = await fetch('/list', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${idToken}`
      }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao ler dados do servidor: ${response.status} - ${errorText}`);
  } 
  ntimes+=1;
  if(ntimes==1) {
    ntimes=0
    _idToken = idToken;
    const data = await response.json();
    personasArr = data.personas;
    if(personasArr.length>0) {
      getid("personagens").style.display = "block";
      getid("personagens").selectedIndex = 0;
      setTimeout(()=>{
        getid("personagens").dispatchEvent(new Event("change"), selecionaPersonagem);
      }, 50);
      getid("planilha").style.display= "block";
    } else  {
      console.info("ZERO ARRAY");
      getid("planilha").style.display= "none";
      getid("personagens").style.display = "none";
      getid("remove").style.display = "none";
    }
    getid("add").style.display = "block";
    getid("login-container").style.display = "none";
    createSelect();
  }
  getid("overblock").style.display = "none";
}
window.readData = readData; // Torna a função global


getid('google-login-button').addEventListener('click', googleLogin);

onAuthStateChanged(auth, (user) => {
  if(user){
    oid = user.uid;
    readData();
  } else {
    getid("overblock").style.display = "none";
    console.info("Nenhum usuário autenticado.");
  }
})