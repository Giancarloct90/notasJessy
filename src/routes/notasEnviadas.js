const express = require('express');
const app = express();
const ImagenNotas = require('../models/imagenNotas');
const Notas = require('../models/notas');
const ContadorNotas = require('../models/contadorNotas');
const {
    getFecha,
    getAllNotas,
    getTipoNotas,
    getFueDirDep,
    getContadorNotas,
    isAuth
} = require('../utils/utils');



// GET ALL INFORMATION TO FILL FIRST PAGE 
app.get('/notasEnviadas', isAuth, async (req, res) => {

    try {
        res.render('notasEnviadas', {
            notasEnviadasDB: await getAllNotas('E'),
            contador: await getContadorNotas('E'),
            tipoNotaDB: await getTipoNotas(),
            fueDirDepDB: await getFueDirDep()
        });
    } catch (e) {
        console.log('Error tratando de obtener toda la informacion de notas Enviadas');
    }

});

// POST INSERT NEW NOTA ENVIADA
app.post('/notasEnviadas', isAuth, async (req, res) => {
    let body = req.body,
        imagenNotas = new ImagenNotas(),
        arr = [],
        files = req.files,
        count = parseInt(body.contador) + 1;
    try {
        let nota = new Notas();
        nota.fechaCreacion = getFecha().fechaTotal;
        // nota.mes = getFecha().mes;
        nota.mes = 'Diciembre';
        nota.anio = '2020';
        // nota.anio = getFecha().anio;
        nota.tipoNota = body.tipoNota;
        nota.numero = body.contador;
        nota.procedencia = body.fueDirDep;
        nota.descripcion = body.descripcion;
        nota.tipo = 'E';
        nota.disponible = true;
        notaDB = await nota.save();
        try {
            await ContadorNotas.findOneAndUpdate({
                tipo: 'E'
            }, {
                contador: count
            }, {});
            try {
                imagenNotas = new ImagenNotas();
                arr = [];
                files.forEach(async (file) => {
                    arr.push({
                        idNota: notaDB.id,
                        imagen: file.filename,
                        disponible: true
                    });
                });
                await imagenNotas.collection.insertMany(arr);
                req.flash('success_msg', 'Nota Agregada Correctamente')
                res.redirect('/notasEnviadas');
            } catch (e) {
                console.log('Error en guardar la img', e)
            }
        } catch (e) {
            console.log('error actulizando el contador de notas', e);
        }
    } catch (e) {
        console.log('Error Tratanto de insertar nueva notaEnviada', e);
    }
});

module.exports = app;