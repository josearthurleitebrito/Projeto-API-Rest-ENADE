require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Habilita o servidor a receber e enviar dados no formato JSON
app.use(express.json());

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const verificarToken = require('./middlewares/auth');
const authRoutes = require('./routes/authRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const estudanteRoutes = require('./routes/estudanteRoutes');
const questaoRoutes = require('./routes/questaoRoutes');

// 1. Rotas Públicas (Abertas para registro e login)
app.use('/auth', authRoutes); 

// 2. Rotas Privadas (Protegidas pelo middleware verificarToken)
app.use('/cursos', verificarToken, cursoRoutes); 
app.use('/estudantes', verificarToken, estudanteRoutes);
app.use('/questoes', verificarToken, questaoRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API do ENADE rodando e conectada ao banco!' });
});

// Init server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});