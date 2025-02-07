// middleware.js
import { auth } from './db.js'; // Importe a instância auth de db.js

export async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Token de autenticação não fornecido ou inválido.');
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await auth.verifyIdToken(idToken); // Use a instância importada
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Erro ao verificar o ID Token:", error);
        return res.status(403).send('Token de autenticação inválido.');
    }
}