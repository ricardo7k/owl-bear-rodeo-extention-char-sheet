// db.js
import { createRequire } from 'module';
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
const require = createRequire(import.meta.url);
const admin = require('firebase-admin');

var FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT;

var serviceAccount;
var serviceAccountString = FIREBASE_SERVICE_ACCOUNT;

if(serviceAccountString) {
    try {
        serviceAccount = JSON.parse(serviceAccountString);
    } catch (error) {
        console.error("ERRO: A variável de ambiente FIREBASE_SERVICE_ACCOUNT não é um JSON válido.", error);
        process.exit(1);
    }
} else {
    console.error("ERRO: A variável de ambiente FIREBASE_SERVICE_ACCOUNT não está definida.");
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

// Exporte db e auth *APÓS* a inicialização
export { db, auth };

// Funções para interagir com o Firestore (CRUD) - Mantenha como antes
async function getPersonagens(userId) {
    var data = [];
    try {
        let query
        if (userId === "JTrgchCJSXeqCmOdBhsuD6ihN5t2") {
            query = db.collection('personagens');
        } else {
            query = db.collection('personagens').where("userId", "==", userId);
        }
        const querySnapshot = await query.get();

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, person: doc.data() });
        });
    } catch(e) {
        data = ["erro get db", e];
    }
    return data;
}

async function salvarPersonagem(documentId, dados) {
    await db.collection('personagens').doc(documentId).set(dados);
    return documentId;
}

async function deletarPersonagem(documentId) {
    await db.collection('personagens').doc(documentId).delete();
}

async function adicionarPersonagem(userId, nome, history) {
    const docRef = await db.collection('personagens').add({ nome, userId, anotacoes: history });
    return { id: docRef.id, nome: nome, anotacoes: history };
}


export { getPersonagens, salvarPersonagem, deletarPersonagem, adicionarPersonagem };

