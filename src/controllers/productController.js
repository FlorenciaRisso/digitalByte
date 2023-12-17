const path = require('path');
const productService = require('../data/productService');

let productController = {
    index: (req, res) => {
        res.render('index')
    },
    carrito: (req, res) => {
        let productos=productService.products;
        res.render('products/productCart',{productos:productos});
    },
    listarProductosPorCat: (req, res) => {
        let productos=productService.getProdPorCat(req);
        res.render('products/categoria',{productos:productos});
    },
    detalle: (req, res) => {
        console.log(req.params.id);
        let producto = productService.getOne(req);
        let productos = productService.getAll();
        res.render('products/productDetail', { producto: producto, productos: productos });
    },
    altaProducto: (req, res) => {
        res.render('products/altaProducto')
    },
    editProducto: (req, res) => {
        let producto = productService.products;
        res.render('products/editProducto', { producto: producto })
    },
    update: (req, res) => {
        res.redirect('/productos');
    },
    eliminarProducto: (req, res) => {
        res.redirect('/productos');
    },
    listarProductos: (req, res) => {
        let productos = productService.products;
        res.render('products/listarProductos', { productos: productos })
    }
}

module.exports = productController;