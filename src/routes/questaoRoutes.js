const express = require('express');
const router = express.Router();
const Questao = require('../models/Questao');

// 1. CREATE (POST)
router.post('/', async (req, res) => {
    try {
        const novaQuestao = new Questao(req.body);
        const questaoSalva = await novaQuestao.save();
        res.status(201).json(questaoSalva);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao criar questão', detalhes: err.message });
    }
});

// 2. READ (GET) - Listar todas
router.get('/', async (req, res) => {
    try {
        const questoes = await Questao.find().populate('id_curso', 'nome_curso');
        res.status(200).json(questoes);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar questões', detalhes: err.message });
    }
});

// 2. READ (GET) - Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const questao = await Questao.findById(req.params.id).populate('id_curso');
        if (!questao) return res.status(404).json({ erro: 'Questão não encontrada' });
        res.status(200).json(questao);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar questão', detalhes: err.message });
    }
});

// 3. UPDATE (PUT)
router.put('/:id', async (req, res) => {
    try {
        const questaoAtualizada = await Questao.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!questaoAtualizada) return res.status(404).json({ erro: 'Questão não encontrada' });
        res.status(200).json(questaoAtualizada);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar questão', detalhes: err.message });
    }
});

// 4. DELETE (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const questaoDeletada = await Questao.findByIdAndDelete(req.params.id);
        if (!questaoDeletada) return res.status(404).json({ erro: 'Questão não encontrada' });
        res.status(200).json({ mensagem: 'Questão deletada com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar questão', detalhes: err.message });
    }
});

module.exports = router;