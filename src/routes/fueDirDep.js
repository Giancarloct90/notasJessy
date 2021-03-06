const express = require('express');
const app = express();
const FueDirDep = require('../models/fueDirDep');
const {
    isAuth
} = require('../utils/utils');


// GET ALL DATA
let getfueDirDep = async () => {
    try {
        let fueDirDepDB = await FueDirDep.find({
            disponible: true
        });
        return fueDirDepDB;
    } catch (e) {
        console.log(e);
    }
};

// GET SHOW DATA
app.get('/datosMaestros', isAuth, async (req, res) => {
    let sess = req.session;
    let flag, msj1, msj2;
    if (sess.FueDirDep) {
        flag = true;
    }
    res.render('fueDirDep', {
        flag,
        msj1: 'Borrado! ',
        msj2: 'La informacion se borro con exito.',
        fueDirDepDB: await getfueDirDep()
    })
});

// POST TO INSERT THE INFO
app.post('/nuevoDatoMaestro', isAuth, async (req, res) => {
    let body = req.body;
    try {
        const fueDirDepDB = new FueDirDep();
        fueDirDepDB.nombre = body.txtNombreFDD;
        fueDirDepDB.descripcion = body.txtDescripcionFDD;
        fueDirDepDB.disponible = true;
        await fueDirDepDB.save();
        res.render('fueDirDep', {
            flag: true,
            msj1: 'Guardado! ',
            msj2: 'La informacion se guardo con exito.',
            fueDirDepDB: await getfueDirDep()
        });
    } catch (e) {
        flag = false;
        res.render('fueDirDep', {
            flag,
            fueDirDepDB: await getfueDirDep()
        });
    }
});

// DELETE DATA
app.get('/borrarDatoMaestro/:id', isAuth, async (req, res) => {
    let id = req.params.id;
    let sess = req.session;
    try {
        let fueDirDepDB = await FueDirDep.findByIdAndUpdate(id, {
            disponible: false
        }, {
            new: true
        });
        sess.FueDirDep = true;
        res.redirect('/datosMaestros');
    } catch (e) {
        console.log('Error Borrar');
    }
});

module.exports = app;