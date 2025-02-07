// routes.js
import { Router } from 'express';
import { verifyToken } from './middleware.js';
import { getPersonagens, salvarPersonagem, deletarPersonagem, adicionarPersonagem } from './db.js';

const router = Router();

router.get('/list', verifyToken, async (req, res) => {
    try {
        const userId = req.user.uid;
        const data = await getPersonagens(userId);
        res.json({ success: true, personas: data });
    } catch (error) {
        console.error("Erro ao ler dados do Firestore:", error);
        res.status(500).json({ success: false, error: error.message }); // Melhor prática: enviar o erro no JSON
    }
});

router.post('/salvar', verifyToken, async (req, res) => {
    try {
        const { documentId, dados } = req.body;
        const id = await salvarPersonagem(documentId, dados);
        res.json({ success: true, id });
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
        const userId = req.user.uid; //Pega o userID do token (boa pratica).
        const {nome} = req.body; // O nome pode vir do body.
        const result = await adicionarPersonagem(userId, nome); //Passa para a função
        res.json({ success: true, id: result.id, nome: result.nome });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;