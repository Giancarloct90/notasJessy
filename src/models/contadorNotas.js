const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let contadorNotas = new Schema({
    tipo: {
        type: String,
        required: [true, 'El Tipo es necesario']
    },
    contador: {
        type: Number,
        required: [true, 'El Contador es necesario']
    }
});

module.exports = mongoose.model('ContadorNotas', contadorNotas);