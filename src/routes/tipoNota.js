const express = require('express');
const app = express();
const TipoNota = require('../models/tipoNota');
// const session = require('express-session');
const {
    isAuth
} = require('../utils/utils');



const getTipoNota = async () => {
    try {
        let tipoNotaDB = await TipoNota.find({
            disponible: true
        });
        return tipoNotaDB;
    } catch (e) {
        console.log('errorZOE', e);
    }
};

// GET, VIEW THE VIEW
app.get('/tipoNotas', isAuth, async (req, res) => {
    let sess = req.session;
    let flag, msj1, msj2;
    if (sess.notaDelete) {
        flag = true;
    }
    res.render('tipoNota', {
        flag,
        msj1: 'Borrado! ',
        msj2: 'La informacion se borro con exito.',
        tipoNotaDB: await getTipoNota()
    });
});

// POST, TO INSERT THE NOTE
app.post('/tipoNotaI', isAuth, async (req, res) => {
    let body = req.body;
    let flag, msj1, msj2;
    try {
        const tipoNotaDB = new TipoNota();
        tipoNotaDB.nombre = body.nombre;
        tipoNotaDB.descripcion = body.descripcion;
        await tipoNotaDB.save();
        res.render('tipoNota', {
            flag: true,
            msj1: 'Guardado! ',
            msj2: 'La informacion se guardo con exito.',
            tipoNotaDB: await getTipoNota()
        });
    } catch (e) {
        flag = false;
        res.render('tipoNota', {
            flag,
            tipoNotaDB: await getTipoNota()
        });
    }
});

// DELETE DATA
app.get('/tipoNotaD/:id', isAuth, async (req, res) => {
    let id = req.params.id
    let sess = req.session;
    try {
        let tipoNotaDB = await TipoNota.findByIdAndUpdate(id, {
            disponible: false
        }, {
            new: true
        });
        sess.notaDelete = true;
        res.redirect('/tipoNotas');
    } catch (e) {
        console.log('Error Borrar');
    }
});

module.exports = app;