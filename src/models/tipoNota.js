const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let tipoNota = new Schema({
    nombre: {
        type: String,
        reuiqred: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('TipoNota', tipoNota);