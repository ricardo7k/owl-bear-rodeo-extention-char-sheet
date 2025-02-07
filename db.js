// db.js
// import * as admin from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url); // Crie a função require
const serviceAccount = require('./config/sak.json'); // Agora funciona!
const admin = require('firebase-admin'); // Force o uso do require!

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const auth = admin.auth(); // Obtenha a instância de auth

// Exporte db e auth *APÓS* a inicialização
export { db, auth };

// Funções para interagir com o Firestore (CRUD) - Mantenha como antes
async function getPersonagens(userId) {
    const querySnapshot = await db.collection('personagens').where('userId', '==', userId).get();
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, person: doc.data() });
    });
    return data;
}

async function salvarPersonagem(documentId, dados) {
    await db.collection('personagens').doc(documentId).set(dados);
    return documentId;
}

async function deletarPersonagem(documentId) {
    await db.collection('personagens').doc(documentId).delete();
}

async function adicionarPersonagem(userId, nome = "Novo Personagem") {
    const docRef = await db.collection('personagens').add({ nome, userId });
    return { id: docRef.id, nome };
}


export { getPersonagens, salvarPersonagem, deletarPersonagem, adicionarPersonagem };

