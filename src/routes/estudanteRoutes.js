const express = require('express');
const router = express.Router();
const Estudante = require('../models/Estudante');

// 1. CREATE (POST)
router.post('/', async (req, res) => {
    try {
        const novoEstudante = new Estudante(req.body);
        const estudanteSalvo = await novoEstudante.save();
        res.status(201).json(estudanteSalvo);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao criar estudante', detalhes: err.message });
    }
});

// 2. READ (GET) - Listar todos
router.get('/', async (req, res) => {
    try {
        const estudantes = await Estudante.find().populate('id_curso', 'nome_curso area_diretriz');
        res.status(200).json(estudantes);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar estudantes', detalhes: err.message });
    }
});

// 2. READ (GET) - Buscar por ID
router.get('/:id', async (req, res) => {
    try {
        const estudante = await Estudante.findById(req.params.id).populate('id_curso');
        if (!estudante) return res.status(404).json({ erro: 'Estudante não encontrado' });
        res.status(200).json(estudante);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar estudante', detalhes: err.message });
    }
});

// 3. UPDATE (PUT)
router.put('/:id', async (req, res) => {
    try {
        const estudanteAtualizado = await Estudante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!estudanteAtualizado) return res.status(404).json({ erro: 'Estudante não encontrado' });
        res.status(200).json(estudanteAtualizado);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar estudante', detalhes: err.message });
    }
});

// 4. DELETE (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const estudanteDeletado = await Estudante.findByIdAndDelete(req.params.id);
        if (!estudanteDeletado) return res.status(404).json({ erro: 'Estudante não encontrado' });
        res.status(200).json({ mensagem: 'Estudante deletado com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar estudante', detalhes: err.message });
    }
});

module.exports = router;