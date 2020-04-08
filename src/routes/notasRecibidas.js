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



// GET TO VIEW THE PAGE OF INFORMATION
app.get('/notasRecibidas', isAuth, async (req, res) => {
    try {
        res.render('notasRecibidas', {

            notasRecibidasDB: await getAllNotas('R'),
            contador: await getContadorNotas('R'),
            tipoNotaDB: await getTipoNotas(),
            fueDirDepDB: await getFueDirDep()
        });
    } catch (e) {
        console.log('Error tratando de obtener toda la informacion de notas Recibidas');
    }
});

// POST TO INSERT DATA 
app.post('/notasRecibidas', isAuth, async (req, res) => {
    let body = req.body,
        notasRecibidasDB, notaDB,
        files = req.files,
        count = parseInt(body.contador) + 1
    try {
        let nota = new Notas();
        nota.fechaCreacion = getFecha().fechaTotal;
        nota.mes = getFecha().mes;
        nota.anio = getFecha().anio;
        nota.tipoNota = body.tipoNota;
        nota.numero = body.contador;
        nota.procedencia = body.fueDirDep;
        nota.descripcion = body.descripcion;
        nota.tipo = 'R';
        nota.disponible = true;
        notaDB = await nota.save();
        // console.log(notaDB);
        // console.log('id:', notaDB.id);
        try {
            await ContadorNotas.findOneAndUpdate({
                tipo: 'R'
            }, {
                contador: count
            }, {});
            try {
                let imagenNotas = new ImagenNotas();
                let arr = [];
                files.forEach(async (file) => {
                    arr.push({
                        idNota: notaDB.id,
                        imagen: file.filename,
                        disponible: true
                    });
                });
                await imagenNotas.collection.insertMany(arr);
                req.flash('success_msg', 'Nota Agregada Correctamente')
                res.redirect('/notasRecibidas');
            } catch (e) {
                console.log('Error en guardar la img', e)
            }
        } catch (e) {
            console.log('error actulizando el contador de notas', e);
        }
    } catch (e) {
        console.log('error guardando la nota', e);
    }
});

// POST INSERT CONTADOR NOTAS
app.post('/contador', isAuth, async (req, res) => {
    try {
        let contador = req.body;
        let contadorDB = new ContadorNotas();
        contadorDB.tipo = contador.tipo;
        contadorDB.contador = contador.contador;
        let conDB = await contadorDB.save();
        console.log(conDB);
        res.send('ok');
    } catch (e) {
        console.log(e);
    }
});

// GET DETAILS ONE NOTE
// app.get('/detalleNotaRecibida', (req, res) => {
//     let sess = req.session;
//     res.render('detalleNotaRecibida.ejs', {
//         notaDB: sess.notadb,
//         imagenNotasDB: sess.imag
//     });
// });

// GET ONE NOTE
app.get('/detalleNotaRecibida', isAuth, async (req, res) => {
    let id = req.query.id,
        imagenNotasDB, notaDB;
    try {
        notaDB = await Notas.findById(id);
        try {
            imagenNotasDB = await ImagenNotas.find({
                idNota: notaDB.id,
                disponible: true,
            });
            res.render('detalleNotaRecibida', {
                notaDB: notaDB,
                imagenNotasDB: imagenNotasDB,
                tipoNota: req.query.tipo
            });
        } catch (e) {
            console.log('error al obetner las imagenes', e);
        }
    } catch (e) {
        console.log('error obtneiendo la informacion de la nota', e);
    }
});

module.exports = app;