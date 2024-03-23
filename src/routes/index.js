const express = require('express');
const router = express.Router();
const routerProductos = require('./productos');
const routerUsuarios = require('./usuarios');
const routerMain = require('./main');

const APIproducts = require('./api/API-productRoutes');
const APIusers = require('./api/API-userRoutes');


router.use('/', routerMain);
router.use('/productos', routerProductos);
router.use('/usuarios', routerUsuarios);

router.use('/api/products', APIproducts);
router.use('/api/users', APIusers);

module.exports = router;