const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let fueDirDep = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatorio']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('FueDirDep', fueDirDep);