// db.js
// import * as admin from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('../config/sak.json');
const admin = require('firebase-admin');

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

async function adicionarPersonagem(userId, nome, history) {
    const docRef = await db.collection('personagens').add({ nome, userId, anotacoes: history });
    return { id: docRef.id, nome: nome, anotacoes: history };
}


export { getPersonagens, salvarPersonagem, deletarPersonagem, adicionarPersonagem };

