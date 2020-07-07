const express = require('express');
const app = express();

const Usuarios = require('../models/usuarios');

app.post('/usuarios', async (req, res) => {
    const {
        nombre,
        nombreUsuario,
        password,
        disponible
    } = req.body;
    try {
        let usuario = new Usuarios();
        usuario.nombre = nombre;
        usuario.nombreUsuario = nombreUsuario;
        usuario.password = password;
        usuario.disponible = true;
        let usuarioDB = await usuario.save();
        if (!usuarioDB) res.status(500).json({

            ok: false,
            message: 'Error en el Server'

        });
        res.status(200).json({
            ok: true,
            message: 'Guardado!!',
            usuarioDB
        });
    } catch (e) {
        res.json({
            ok: false,
            message: e
        });
    }
});

module.exports = app;