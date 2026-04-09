require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Conectado ao MongoDB com sucesso!'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// IMPORTANDO E USANDO AS ROTAS
const cursoRoutes = require('./routes/cursoRoutes');
app.use('/cursos', cursoRoutes); 

const estudanteRoutes = require('./routes/estudanteRoutes');
app.use('/estudantes', estudanteRoutes);

const questaoRoutes = require('./routes/questaoRoutes');
app.use('/questoes', questaoRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API do ENADE rodando e conectada ao banco!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});