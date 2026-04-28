const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// 1. REGISTRO DE USUÁRIO
router.post('/registrar', async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        // Verifica se o usuário já existe no banco
        const usuarioExistente = await Usuario.findOne({ usuario });
        if (usuarioExistente) {
            return res.status(400).json({ erro: 'Usuário já existe!' });
        }

        // Criptografa a senha (Hash) antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        // Salva o novo usuário com a senha protegida
        const novoUsuario = new Usuario({
            usuario,
            senha: senhaCriptografada
        });

        await novoUsuario.save();
        res.status(201).json({ mensagem: 'Usuário registrado com sucesso!' });

    } catch (err) {
        res.status(500).json({ erro: 'Erro ao registrar usuário', detalhes: err.message });
    }
});

// 2. LOGIN (GERAÇÃO DE TOKENS)
router.post('/login', async (req, res) => {
    try {
        const { usuario, senha } = req.body;

        // Busca o usuário no banco
        const user = await Usuario.findOne({ usuario });
        if (!user) {
            return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
        }

        // Compara a senha digitada com a senha criptografada do banco
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(400).json({ erro: 'Usuário ou senha inválidos' });
        }

        // Se a senha estiver correta, gera o Access Token (dura 15 minutos, por exemplo)
        const accessToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '15m' }
        );

        // Gera o Refresh Token (dura mais tempo, ex: 7 dias)
        const refreshToken = jwt.sign(
            { id: user._id }, 
            process.env.JWT_REFRESH_SECRET, 
            { expiresIn: '7d' }
        );

        // Retorna os tokens para quem fez a requisição
        res.status(200).json({ 
            mensagem: 'Login realizado com sucesso',
            accessToken,
            refreshToken
        });

    } catch (err) {
        res.status(500).json({ erro: 'Erro ao fazer login', detalhes: err.message });
    }
});

module.exports = router;