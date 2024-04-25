const { routerNotes, routerUsers } = require('./components/index');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use('/api/v1/notes', routerNotes);
app.use('/api/v1/users', routerUsers);

module.exports = app;