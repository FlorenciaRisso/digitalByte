const express = require('express');
const router = express.Router();
const routerProductos = require('./productos');
const routerUsuarios = require('./usuarios');
const routerMain = require('./main');

const APIproducts = require('./api/API-productRoutes');
const APIusers = require('./api/API-userRoutes');
const APIcateg = require('./api/API-categRoutes');


router.use('/', routerMain);
router.use('/productos', routerProductos);
router.use('/usuarios', routerUsuarios);

router.use('/api/products', APIproducts);
router.use('/api/users', APIusers);
router.use('/api/cat', APIcateg);

router.use('*', function (req, res, next) {
    const err = new Error();
    err.status = 404;
    next(err);
});

router.use(function(err, req, res, next) {
    if (err.status === 404) {
        res.status(404).render('error404');
    } else {
        next(err);
    }
});

module.exports = router;