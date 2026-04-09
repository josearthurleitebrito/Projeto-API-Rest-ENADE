const mongoose = require('mongoose');

const questaoSchema = new mongoose.Schema({
    // Relacionamento: a qual curso essa questão pertence
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    ano_aplicacao: {
        type: Number,
        required: true
    },
    componente: {
        type: String,
        enum: ['Formação Geral', 'Componente Específico'], // Validação para aceitar só esses dois
        required: true
    },
    enunciado: {
        type: String,
        required: true
    },
    gabarito: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Questao', questaoSchema);