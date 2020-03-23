const express = require('express');
const app = express();
const {
    getFecha,
    getAllNotas,
    getTipoNotas,
    getFueDirDep,
    getContadorNotas,
    getMonthNotes,
    getAniosReport
} = require('../utils/utils');

app.get('/reportes', async (req, res) => {
    await getMonthNotes('E');
    res.send('ok');
    //const arr = await getMonthNotes('E');
    // res.render('reportes', {
    //     meses: arr.mesesF,
    //     anios: arr.aniosF
    // });
});





module.exports = app;