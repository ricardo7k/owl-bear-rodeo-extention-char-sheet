const express = require("express");
const cors = require('cors');
const app = express();



app.use(express.json());

const admin = require('firebase-admin');
const serviceAccount = require('./nova-key.json'); 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function listarPersonagens(req, res, _html) {
  var arrPersonas = []
  try {
    const personagensRef = db.collection('personagens');
    const snapshot = await personagensRef.get();
    snapshot.forEach(doc => {
      arrPersonas.push({id:doc.id,person:doc.data()});
    });
    res.render(_html, {personas:arrPersonas});
  } catch (error) {
    console.error('Erro ao listar personagens:', error);
  }
}

app.post('/salvar', (req, res) => {
  const documentId = req.body.documentId;
  const dados = req.body.dados;

  db.collection('personagens').doc(documentId).set(dados)
    .then(() => {
      res.json({ success: true, id:documentId });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message }); // Envia uma resposta JSON de erro
    });
});

app.post('/del', (req, res) => {
  const documentId = req.body.documentId;

  db.collection('personagens').doc(documentId).delete()
    .then(() => {
      res.json({ success: true }); // Envia uma resposta JSON de sucesso
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message }); // Envia uma resposta JSON de erro
    });
});

app.post('/add', (req, res) => {
  const nome = "Novo Personagem"
  db.collection('personagens').add({nome:nome})
  .then((doc) => {
      res.json({ success: true, id: doc.id, nome: nome });
    })
    .catch(error => {
      res.status(500).json({ success: false, error: error.message }); // Envia uma resposta JSON de erro
    });
});

app.use(function(req, res, next){
    res.header('Access-Control-Allow-Private-Network', 'true');
    res.header('Access-Control-Allow-Origin', 'https://www.owlbear.rodeo');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, accept, access-control-allow-origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Vary', 'Origin');
 
    if ('OPTIONS' == req.method) res.status(200).send();

    else next();
});

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  listarPersonagens(req, res, 'pages/index')
});

app.get("/pop/:key", (req, res) => {
  res.render('pages/pop', { 
    key:req.params.key
  });
});

app.use(express.static(__dirname+"/public"));


app.listen(8080, () => {
  console.log("Running 8080");
});
