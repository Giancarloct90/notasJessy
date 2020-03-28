const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarios = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es obligatorio']
    },
    nombreUsuario: {
        type: String,
        required: [true, 'El Nombre de usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    disponible: {
        type: Boolean,
        required: [true, 'Disponible es necesario']
    }
});

module.exports = mongoose.model('Usuarios', usuarios);