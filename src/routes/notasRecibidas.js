const express = require('express');
const app = express();
const TipoNota = require('../models/tipoNota');
const FueDirDep = require('../models/fueDirDep');
const ContadorNotas = require('../models/contadorNotas');
const Notas = require('../models/notas');

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
    let te = await getAllNotas();
    var date = new Date();
    console.log(date);
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
    let notasRecibidasDB;
    let count = parseInt(body.contador) + 1;
    try {
        let notaBD = new Notas();
        notaBD.tipoNota = body.tipoNota;
        notaBD.numero = body.contador;
        notaBD.procedencia = body.fueDirDep;
        notaBD.descripcion = body.descripcion;
        notaBD.tipo = 'R';
        await notaBD.save();
        try {
            await ContadorNotas.findOneAndUpdate({
                tipo: 'R'
            }, {
                contador: count
            }, {});
        } catch (e) {
            console.log('error zoe', e);
        }
        res.redirect('/notasRecibidas');
    } catch (e) {
        console.log(e);
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


module.exports = app;