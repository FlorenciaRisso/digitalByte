const express = require('express');
const router = express.Router();
const routerProductos = require('./productos.routes');
const routerUsuarios = require('./usuarios.routes');
const routerMain = require('./main.routes');

router.use('/', routerMain);
router.use('/Productos', routerProductos);
router.use('/Usuarios', routerUsuarios);

module.exports = router;