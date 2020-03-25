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