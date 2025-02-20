// db.js
import { createRequire } from 'module';
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env
const require = createRequire(import.meta.url);
const admin = require('firebase-admin');

var GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

var serviceAccount;
var serviceAccountString = GOOGLE_APPLICATION_CREDENTIALS;

if(serviceAccountString) {
    try {
        serviceAccount = JSON.parse(serviceAccountString);
    } catch (error) {
        console.error("ERRO: A variável de ambiente GOOGLE_APPLICATION_CREDENTIALS não é um JSON válido.", error);
        process.exit(1);
    }
} else {
    console.error("ERRO: A variável de ambiente GOOGLE_APPLICATION_CREDENTIALS não está definida.");
}

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

async function getPersonagens(userId) {
    var data = [];
    try {
        let query
        if (userId === "JTrgchCJSXeqCmOdBhsuD6ihN5t2") {
            query = db.collection('personagens')
                    .orderBy("userId")
                    .orderBy("nome");
        } else {
            query = db.collection('personagens')
                    .where("userId", "==", userId)
                    .orderBy("nome");
        }
        const querySnapshot = await query.get();

        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, person: doc.data() });
        });
    } catch(e) {
        data = ["erro get db", e];
        console.error(e);
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

