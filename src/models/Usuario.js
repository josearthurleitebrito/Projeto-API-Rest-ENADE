const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true // Não podem existir dois logins iguais
    },
    senha: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);