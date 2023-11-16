const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

const registerHtmlFile = path.join(__dirname, '/views/registro.html');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(registerHtmlFile);
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: localhost:${port}`);
});

