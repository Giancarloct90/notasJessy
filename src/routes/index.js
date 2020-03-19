const express = require('express');
const app = express();

app.use(require('./fueDirDep'));
app.use(require('./notasRecibidas'));
app.use(require('./notasEnviadas'));
app.use(require('./home'));
app.use(require('./tipoNota'));
app.use(require('./reportes'));

module.exports = app;