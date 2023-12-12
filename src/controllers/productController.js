const path=require('path');
const productService = require('../data/productService');

let productController = {
    index: (req, res)=>{
        res.render('index')
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del producto " + req.params.id);
    },

    carrito: (req,res) => {
        res.render('products/productCart')
    },
    detalle:(req,res) => {
        
        res.render('products/productDetail')
    },
    altaProducto:(req,res) => {
        res.render('products/altaProducto')
    },
    editProducto:(req,res) => {
        let producto=productService.getOne(req);
        res.render('products/editProducto')
    },
    update:(req,res) => {
        res.redirect('/productos');
    },
    eliminarProducto:(req,res) => {
        res.redirect('/productos');
    },
    listarProductos:(req,res) => {
        let productos = productService.products;
        console.log(productos);
        res.render('products/listarProductos',{productos:productos})
    }
}

module.exports = productController;