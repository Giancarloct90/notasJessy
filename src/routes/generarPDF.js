const express = require('express');
const app = express();
const pdfmake = require('pdfmake');
const path = require('path');
const fs = require('fs');
const {
    getNotesAnioMes,
    generateDadaForPdf
} = require('../utils/utils');

// GENERATE PDF DOCUMENTS
app.get('/generarPDF', async (req, res) => {
    let tipo, notasDB, reporteNotas = {};
    let data;

    try {
        notasDB = await getNotesAnioMes(req.query.anio, req.query.mes, req.query.tipo);
        data = generateDadaForPdf(notasDB, req.query.tipo, req.query.anio, req.query.mes);
    } catch (e) {
        console.log('Error tratando de obteenr la informacion de las Notas', e);
    }

    let fonts = {
        Roboto: {
            normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
            bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
            italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
            bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
        }
    };

    reporteNotas = {
        pageSize: 'A4',
        footer: (currentPage, pageCount) => {
            return {
                text: `Pagina ${currentPage.toString()} de ${pageCount.toString()}`,
                alignment: 'center',
                fontSize: 11
            }
        },
        content: data
    }
    var tempFile;
    let printer = new pdfmake(fonts);
    let pdfdoc = printer.createPdfKitDocument(reporteNotas);
    let nombreDireccionPDF = path.join(__dirname, `../../public/rrpp/reportes/${new Date().getTime()}.pdf`);
    pdfdoc.pipe(tempFile = fs.createWriteStream(nombreDireccionPDF));
    pdfdoc.end();
    tempFile.on('finish', async function () {
        // do send PDF file 
        res.sendFile(nombreDireccionPDF);
    });

});
module.exports = app;