const express = require('express');
const path = require('path');

const app = express();
const port = 4000;

const homeHtmlFile = path.join(__dirname, '/views/index.html');
const cartHtmlFile = path.join(__dirname, '/views/productCart.html');
const productDetailHtmlFile = path.join(__dirname, '/views/productDetail.html');
const loginHtmlFile = path.join(__dirname, '/views/login.html');
const registerHtmlFile = path.join(__dirname, '/views/register.html');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(homeHtmlFile);
});

app.get('/detail', (req, res) => {
  res.sendFile(productDetailHtmlFile);
});

app.get('/cart', (req, res) => {
  res.sendFile(cartHtmlFile);
});

app.get('/login', (req, res) => {
  res.sendFile(loginHtmlFile);
});

app.get('/register', (req, res) => {
  res.sendFile(registerHtmlFile);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: localhost:${port}`);
});
