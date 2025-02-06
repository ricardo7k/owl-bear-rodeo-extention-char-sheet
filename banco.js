const admin = require('firebase-admin');
const serviceAccount = require('./nova-key.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function listarPersonagens() {
  try {
    const personagensRef = db.collection('personagens');
    const snapshot = await personagensRef.get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  } catch (error) {
    console.error('Erro ao listar personagens:', error);
  }
}

listarPersonagens();