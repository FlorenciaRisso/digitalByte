const path = require('path');
const productService = require('../data/productService');

let productController = {
    index: (req, res) => {
        let productos=productService.products;
        res.render('index',{productos:productos})
    },
    carrito: (req, res) => {
        let productos = productService.products;
        res.render('productCart', { productos: productos });
    },
    listarProductosPorCat: (req, res) => {
        let productos = productService.getProdPorCat(req);
        res.render('categoria', { productos: productos });
    },
    detalle: (req, res) => {
        console.log(req.params.id);
        let producto = productService.getOne(req);
        let productos = productService.getAll();
        res.render('productDetail', { producto: producto, productos: productos });
    },
    altaProducto: (req, res) => {
        res.render('./products/altaProducto')
    },

    store: (req, res) => {
        req.body.image = req.file.filename;
        productService.save(req.body, req.file);
        res.send('producto agregado a la lista')
        //res.redirect('/products');
    },

    edit: (req, res) => {
        let producto = productService.products;
        res.render('editProducto', { producto: producto })
    },

    update: (req, res) => {
        res.redirect('/productos');
    },
    eliminarProducto: (req, res) => {
        res.redirect('/productos');
    },
    listarProductos: (req, res) => {
        let productos = productService.products;
        res.render('./products/listarProductos', { productos: productos })
    }
}

module.exports = productController;