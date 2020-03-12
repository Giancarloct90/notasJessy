const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let notas = new Schema({
    fechaCreacion: {
        type: String,
        required: [true, 'La fecha de nota es necesario']
    },
    mes: {
        type: String,
        required: [true, 'El mes es necesario']
    },
    anio: {
        type: String,
        required: [true, 'El anio es necesario']
    },
    tipoNota: {
        type: String,
        required: [true, 'El tipo de nota es necesario']
    },
    numero: {
        type: Number,
        required: [true, 'El numero es obligatorio']
    },
    procedencia: {
        type: String,
        required: [true, 'La procedencia es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La Descripcion es obligatoria']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es obligatoria']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Notas', notas);