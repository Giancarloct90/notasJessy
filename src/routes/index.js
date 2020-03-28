const express = require('express');
const app = express();

app.use(require('./fueDirDep'));
app.use(require('./notasRecibidas'));
app.use(require('./notasEnviadas'));
app.use(require('./home'));
app.use(require('./tipoNota'));
app.use(require('./reportes'));
app.use(require('./generarPDF'));
app.use(require('./login'));
app.use(require('./usuarios'));

module.exports = app;