const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let imagenNotas = new Schema({
    idNota: {
        type: String,
        required: [true, 'El id de la nota es obligatorio']
    },
    imagen: {
        type: String,
        required: [true, 'la imagen es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true,
        required: [true, 'la imagen es obligatoria']
    }
});

module.exports = mongoose.model('ImagenNotas', imagenNotas);