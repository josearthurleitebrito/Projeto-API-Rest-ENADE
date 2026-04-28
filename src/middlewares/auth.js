const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // 1. Pega o token do cabeçalho (Header) da requisição
    const tokenHeader = req.headers['authorization'];
    
    // 2. Verifica se o usuário mandou o cabeçalho
    if (!tokenHeader) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido!' });
    }

    // 3. O padrão é enviar "Bearer <token>". Precisamos separar a palavra do token real.
    const token = tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Formato de token inválido!' });
    }

    try {
        // 4. Tenta validar o token usando a chave secreta do seu .env
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // 5. Salva o ID do usuário validado dentro da requisição
        req.usuario = verificado; 
        
        // 6. next() significa: "Token válido! Pode liberar a rota!"
        next();
    } catch (err) {
        res.status(403).json({ erro: 'Token inválido ou expirado!' });
    }
};

module.exports = verificarToken;