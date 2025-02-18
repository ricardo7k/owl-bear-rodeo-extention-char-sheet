// routes.js
import { Router } from 'express';
import { verifyToken } from './middleware.js';
import { getPersonagens, salvarPersonagem, deletarPersonagem, adicionarPersonagem } from './db.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config'; // Carrega as variáveis de ambiente do .env

const router = Router();

// Configuração do Gemini
var GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

router.get('/name', async (req, res) => {    
    try {
        const prompt = "Crie somente um nome em portugues bem engraçado para um personagem de RPG de faroeste bem abrasileirado, combinando elementos do faroeste clássico com toques de brasilidade e humor, mas somente um nome sem nenhuma explicação";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Envia o nome gerado como resposta
        res.json({ name: text });

    } catch (error) {
        console.error("Erro ao gerar nome:", error);
        res.json({ name: "Governador Censurino Brito" });
        //res.status(500).json({ error: "Erro ao gerar nome." }); // Resposta de erro mais informativa
    }
});

router.get('/history/:name', async (req, res) => {    
    try {
        const prompt = `Crie uma historia em uma frase para um personagem com este nome: ${req.params.name}. A A frase deve ser em portugues engraçada para um personagem de RPG de faroeste bem abrasileirado, combinando elementos do faroeste clássico com toques de brasilidade e humor, mas somente um nome sem nenhuma explicação`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Envia o nome gerado como resposta
        res.json({ name:req.params.name, history: text });

    } catch (error) {
        console.error("Erro ao gerar nome:", error);
        res.status(500).json({ error: "Erro ao gerar nome." }); // Resposta de erro mais informativa
    }
});

router.get('/list', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid;
        const data = await getPersonagens(userId);
        res.json({ success: true, personas: data, userId:userId });
    } catch (error) {
        console.error("Erro ao ler dados do Firestore:", error);
        res.status(500).json({ success: false, error: error.message }); // Melhor prática: enviar o erro no JSON
    }
});

router.post('/salvar', verifyToken, async (req, res) => {
    try {
        const { documentId, dados } = req.body;
        const id = await salvarPersonagem(documentId, dados);
        res.json({ success: true, id: req.body.userId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/del', verifyToken, async (req, res) => {
    try {
        const { documentId } = req.body;
        await deletarPersonagem(documentId);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/add', verifyToken, async (req, res) => {
     try {
        const userId = req.user.uid;
        const name = req.body.name;
        const history = req.body.history;
        const result = await adicionarPersonagem(userId, name, history);
        res.json({ success: true, id: result.id, nome: name, anotacoes: history });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;