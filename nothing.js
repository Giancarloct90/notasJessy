const pdfmake = require('pdfmake');
const path = require('path');
const fs = require('fs');
let fonts = {
    Roboto: {
        normal: 'node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf',
        bold: 'node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf',
        italics: 'node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf',
        bolditalics: 'node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf'
    }
};
var data = {
    content: [
        // TITULO
        {
            text: '\nCONSTANCIA\n\n',
            style: 'header',
            fontSize: 16,
            alignment: 'center'
        },
    ]
}

let printer = new pdfmake(fonts);
let pdfdoc = printer.createPdfKitDocument(data);
let nombreDireccionPDF = path.join(__dirname, `../../public/rrpp/reportes/${new Date().getTime()}.pdf`);
pdfdoc.pipe(fs.createWriteStream(nombreDireccionPDF));
pdfdoc.end();
res.send('create');


/////////////////

// // FECHA  
// {
//     text: `Fecha: ${notas.fechaCreacion}`,
//     fontSize: 11
// },

// // TIPO NOTA
// {
//     text: `Tipo Nota: ${notas.tipoNota}`,
//     fontSize: 11
// },

// // PROCEDENCIA
// {
//     text: `${procedencia}: ${notas.procedencia}`,
//     fontSize: 11
// },

// // NUMERO DE NOTA
// {
//     text: `No. Nota: ${notas.numero}`,
//     fontSize: 11
// },

const createPDF = async (reporteNotas, fonts) => {
            return new Promise((resolve, reject) => {
                let printer = new pdfmake(fonts);
                let pdfdoc = printer.createPdfKitDocument(reporteNotas);
                let nombreDireccionPDF = path.join(__dirname, `../../public/rrpp/reportes/${new Date().getTime()}.pdf`);
                pdfdoc.pipe(fs.createWriteStream(nombreDireccionPDF));
                pdfdoc.on('end', () => {
                    console.log('Created');
                    resolve(nombreDireccionPDF);
                    // res.sendFile(`${nombreDireccionPDF}`);
                    // res.download(`${nombreDireccionPDF}`);
                });
                pdfdoc.on('error', () => {
                    console.log('Error1');
                    // res.sendFile(`${nombreDireccionPDF}`);
                    // res.download(`${nombreDireccionPDF}`);
                });

                pdfdoc.end();
            });