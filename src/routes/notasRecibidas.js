const express = require('express');
const app = express();
const TipoNota = require('../models/tipoNota');
const FueDirDep = require('../models/fueDirDep');
const ContadorNotas = require('../models/contadorNotas');
const Notas = require('../models/notas');
const ImagenNotas = require('../models/imagenNotas');

// GET ALL DATA
const getAllNotas = async () => {
    try {
        let notaBD = await Notas.find({
            tipo: 'R',
            disponible: true
        });
        return notaBD;
    } catch (e) {
        console.log('Error zoe:', e);
    }
};

// GET TO VIEW THE PAGE OF INFORMATION
app.get('/notasRecibidas', async (req, res) => {
    let tipoNotaDB, fueDirDepDB, contador, ContadorNotasDB, notasRecibidasDB;
    try {
        tipoNotaDB = await TipoNota.find({
            disponible: true
        });
        try {
            fueDirDepDB = await FueDirDep.find({
                disponible: true
            });
            try {
                ContadorNotasDB = await ContadorNotas.find({
                    tipo: 'R'
                });
            } catch (e) {
                console.log('error zoe', e);
            }
        } catch (e) {
            console.log('error zoe:', e);
        }
    } catch (e) {
        console.log('error zoe:', e);
    }
    res.render('notasRecibidas', {
        notasRecibidasDB: await getAllNotas(),
        contador: ContadorNotasDB,
        tipoNotaDB: tipoNotaDB,
        fueDirDepDB: fueDirDepDB
    });
});

// POST TO INSERT DATA 
app.post('/notasRecibidas', async (req, res) => {
    let body = req.body;
    let notasRecibidasDB, notaDB;
    let files = req.files;
    let count = parseInt(body.contador) + 1;
    try {
        let nota = new Notas();
        nota.tipoNota = body.tipoNota;
        nota.numero = body.contador;
        nota.procedencia = body.fueDirDep;
        nota.descripcion = body.descripcion;
        nota.tipo = 'R';
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
                        imagen: file.filename
                    });
                });
                await imagenNotas.collection.insertMany(arr);
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

//POST INSERT CONTADOR NOTAS
app.post('/contador', async (req, res) => {
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

// GET ONE NOTE
app.get('/detalleNotaRecibida/:id', async (req, res) => {
    let id = req.params.id,
        imagenNotasDB, notaDB;
    console.log(id);
    try {
        notaDB = await Notas.findById(id);
        console.log(notaDB);
        try {
            imagenNotasDB = await ImagenNotas.find({
                idNota: '5e693b6320b01d1f5c459e35',
                disponible: true
            });
            console.log(imagenNotasDB);
            res.render('detalleNotaRecibida.ejs', {
                notaDB: notaDB,
                imagenNotasDB: imagenNotasDB
            });
        } catch (e) {
            console.log('error en la obtencion de imagenes', e);
        }
    } catch (e) {
        console.log('error obtneiendo la informacion de la nota', e);
    }
});

module.exports = app;