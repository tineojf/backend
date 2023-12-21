const app = require('./app');
require('dotenv').config();

app.get('/', (req, res) => {
  res.json('¡Hola, mundo con Expresssssssssss!');
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en http://localhost:${PORT}`);
});