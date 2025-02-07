// server.js
import express from 'express';
import cors from 'cors';
import router from './src/routes.js';  // Importa as rotas
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); //Para usar o __dirname
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
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

app.use(express.json());
app.set('view engine', 'ejs');

// Rotas da API (usando o router)
app.use(router);

// Rotas estáticas e de templates (se você estiver usando)
app.get("/", (req, res) => {
    res.render('pages/index', { personas: [] });
});

app.get("/pop/:key", (req, res) => {
    res.render('pages/pop', { key: req.params.key });
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;  // Use a porta do ambiente ou 8080
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});