const express = require('express');
const app = express();
const TipoNota = require('../models/tipoNota');
const FueDirDep = require('../models/fueDirDep');
const ContadorNotas = require('../models/contadorNotas');
const Notas = require('../models/notas');
const ImagenNotas = require('../models/imagenNotas');

// FUNCTION GET ALL DATA
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

// FUNCTION GETFECHA
let getFecha = () => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dias = [, "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    return {
        fechaTotal: `${dias[new Date().getDay()]} ${new Date().getDate()} de ${meses[new Date().getMonth()]} del ${new Date().getFullYear()}`,
        mes: `${meses[new Date().getMonth()]}`,
        anio: `${new Date().getFullYear()}`
    }
};

// GET TO VIEW THE PAGE OF INFORMATION
app.get('/notasRecibidas', async (req, res) => {
    let tipoNotaDB, fueDirDepDB, contador, ContadorNotasDB, notasRecibidasDB, sess = req.session,
        notificacion, flag;
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
                console.log(sess.notaSaved);
                if (sess.notaSaved) {
                    flag = true
                }
                sess.notaSaved = false;
                console.log(sess.notaSaved);

                res.render('notasRecibidas', {
                    flag: flag,
                    msj1: 'Guardado!',
                    msj2: 'La informacion se guardo con exito.',
                    notasRecibidasDB: await getAllNotas(),
                    contador: ContadorNotasDB,
                    tipoNotaDB: tipoNotaDB,
                    fueDirDepDB: fueDirDepDB
                });
            } catch (e) {
                console.log('Error: get Contador', e);
            }
        } catch (e) {
            console.log('Error: get fueDirDep', e);
        }
    } catch (e) {
        console.log('Error: get tipo Nota', e);
    }
});

// POST TO INSERT DATA 
app.post('/notasRecibidas', async (req, res) => {
    let body = req.body,
        notasRecibidasDB, notaDB,
        files = req.files,
        count = parseInt(body.contador) + 1,
        sess = req.session;
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
                sess.notaSaved = true;
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

app.get('/te', (req, res) => {
    let sess = req.session;
    // console.log(sess.notadb);
    // console.log(sess.imag);
    res.render('detalleNotaRecibida.ejs', {
        notaDB: sess.notadb,
        imagenNotasDB: sess.imag
    });
});

// GET ONE NOTE
app.get('/detalleNotaRecibida/:id', async (req, res) => {
    let id = req.params.id,
        imagenNotasDB, notaDB;
    let sess = req.session;
    // console.log(id);
    try {
        notaDB = await Notas.findById(id);
        // console.log(notaDB);
        try {
            imagenNotasDB = await ImagenNotas.find({
                idNota: notaDB.id,
                disponible: true,
            });
            // console.log(imagenNotasDB);
            sess.notadb = notaDB;
            sess.imag = imagenNotasDB;
            res.redirect('/te');
            // res.render('detalleNotaRecibida.ejs', {
            //     notaDB: notaDB,
            //     imagenNotasDB: imagenNotasDB
            // });
        } catch (e) {
            console.log('error en la obtencion de imagenes', e);
        }
    } catch (e) {
        console.log('error obtneiendo la informacion de la nota', e);
    }
});

module.exports = app;