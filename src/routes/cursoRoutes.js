const express = require('express');
const router = express.Router();
const Curso = require('../models/Curso'); 

// 1. CREATE (Criar) - Método POST
router.post('/', async (req, res) => {
    try {
        const novoCurso = new Curso(req.body); 
        const cursoSalvo = await novoCurso.save(); 
        res.status(201).json(cursoSalvo); 
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao criar curso', detalhes: err.message });
    }
});

// 2. READ (Ler/Listar) - Método GET
router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.find(); 
        res.status(200).json(cursos);
    } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar cursos', detalhes: err.message });
    }
});

// Buscar um curso específico pelo ID
router.get('/:id', async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id);
        if (!curso) {
            return res.status(404).json({ erro: 'Curso não encontrado' });
        }
        res.status(200).json(curso);
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar o curso', detalhes: err.message });
    }
});

// 3. UPDATE (Atualizar) - Método PUT
router.put('/:id', async (req, res) => {
    try {
        const cursoAtualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!cursoAtualizado) {
            return res.status(404).json({ erro: 'Curso não encontrado para atualizar' });
        }
        res.status(200).json(cursoAtualizado);
    } catch (err) {
        res.status(400).json({ erro: 'Erro ao atualizar curso', detalhes: err.message });
    }
});

// 4. DELETE (Deletar) - Método DELETE
router.delete('/:id', async (req, res) => {
    try {
        const cursoDeletado = await Curso.findByIdAndDelete(req.params.id);
        
        if (!cursoDeletado) {
            return res.status(404).json({ erro: 'Curso não encontrado para deletar' });
        }
        res.status(200).json({ mensagem: 'Curso deletado com sucesso!' });
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao deletar curso', detalhes: err.message });
    }
});

module.exports = router;