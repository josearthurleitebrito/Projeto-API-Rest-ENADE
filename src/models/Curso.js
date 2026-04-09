const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nome_curso: {
        type: String,
        required: true
    },
    area_diretriz: {
        type: String,
        required: true
    },
    coordenador: {
        type: String,
        required: true
    },
    nota_enade_anterior: {
        type: Number,
        required: false // Opcional, pois pode ser um curso novo
    },
    ano_ultima_avaliacao: {
        type: Number,
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Curso', cursoSchema);