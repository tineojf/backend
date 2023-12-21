const { routerNotes } = require('./components/index');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/notes', routerNotes);

module.exports = app;