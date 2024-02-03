const path = require('path');
const productService = require('../data/productService');
const funcion = require('../data/funcion');
const db = require('../model/database/models')

let productController = {
    index: (req, res) => {
        let productos = productService.products;
        res.render('productos/index', { productos: productos, funcion: funcion })
    },
    listado:
     async function(req, res){
        try {            
            let respuesta = await db.Productos.findAll();
            res.json(respuesta)
        } catch (error) {
           console.log(error);
        }
    },

    lista: (req, res) => {
        let productos = productService.products;
        res.render('productos/lista', { productos: productos, funcion: funcion})
    },
    carrito: (req, res) => {
        let productos = productService.products;
        res.render('productos/productCart', { productos: productos, funcion: funcion });
    },
    listaPorCat: (req, res) => {
        let productos = productService.getProdPorCat(req);
        res.render('productos/categoria', { productos: productos, funcion: funcion });
    },
    detalle: (req, res) => {
        let producto = productService.getOne(req);
        let productos = productService.getAll();
        res.render('productos/productDetail', { producto: producto, productos: productos, funcion: funcion });
    },
    create: (req, res) => {
        res.render('productos/create', { funcion: funcion })
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
        productService.delete(req);
        res.redirect('/productos/listar');
    },

}

module.exports = productController;