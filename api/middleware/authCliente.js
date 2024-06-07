const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido. ' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.clienteId = decoded.clienteId; 
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido .' });
    }
};

module.exports = auth;
