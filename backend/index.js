const app = require('./app');
require('dotenv').config();

app.get('/', (req, res) => {
  res.json('URL API: http://localhost:8000/api/v1/notes');
});


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`La aplicación está escuchando en http://localhost:${PORT}`);
});