const path = require('path');
const productService = require('../data/productService');
const funcion = require('../data/funcion')

let productController = {
    index: (req, res) => {
        let productos = productService.products;
        res.render('productos/index', { productos: productos, funcion: funcion })
    },
    carrito: (req, res) => {
        let productos = productService.products;
        res.render('productos/productCart', { productos: productos, funcion: funcion });
    },
    listarProductosPorCat: (req, res) => {
        let productos = productService.getProdPorCat(req);
        res.render('productos/categoria', { productos: productos, funcion: funcion });
    },
    detalle: (req, res) => {
        let producto = productService.getOne(req);
        let productos = productService.getAll();
        res.render('productos/productDetail', { producto: producto, productos: productos, funcion: funcion });
    },
    altaProducto: (req, res) => {
        res.render('productos/altaProducto', { funcion: funcion })
    },
    save: (req, res) => {
        productService.save(req);
        res.redirect('/productos');
    },
    editProducto: (req, res) => {
        let producto = productService.getOne(req);
        res.render('productos/editProducto', { producto: producto, funcion: funcion })
    },
    update: (req, res) => {
        productService.update(req);
        res.redirect('/productos');
    },
    eliminarProducto: (req, res) => {
        console.log(req.params.id);
        productService.delete(req);
        res.redirect('/productos/listar');
    },
    listarProductos: (req, res) => {
        let productos = productService.products;
        res.render('productos/listarProductos', { productos: productos, funcion: funcion })
    }
}

module.exports = productController;