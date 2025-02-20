import express from 'express';
import router from './src/routes.js';
import path from 'path';
import tmp from 'tmp';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Logging } from '@google-cloud/logging';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempFile = tmp.fileSync();
fs.writeFileSync(tempFile.name, process.env.GOOGLE_APPLICATION_CREDENTIALS);

const app = express();

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
app.use(router);

app.get("/", (req, res) => {
    res.render('pages/index', { personas: [] });
});

app.get("/pop/:key", (req, res) => {
    res.render('pages/pop', { key: req.params.key });
});

app.use(express.static(path.join(__dirname, "public")));

let PORT = process.env.PORT || 8080;

async function startServer() {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
//Do something

startServer();

