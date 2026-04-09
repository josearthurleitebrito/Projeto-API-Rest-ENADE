const mongoose = require('mongoose');

const estudanteSchema = new mongoose.Schema({
    nome_completo: {
        type: String,
        required: true
    },
    matricula: {
        type: String,
        required: true,
        unique: true // A matrícula não pode se repetir
    },
    // Relacionamento: salvo o ID do Curso ao qual o aluno pertence
    id_curso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
    ano_ingresso: {
        type: Number,
        required: true
    },
    status_inscricao: {
        type: String,
        enum: ['regular', 'dispensado', 'concluinte'], // Só aceita esses 3 valores
        default: 'regular'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Estudante', estudanteSchema);