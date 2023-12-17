const path=require('path');
const productService = require('../data/productService');

let productController = {
    index: (req, res)=>{
        res.render('index')
    },

    carrito: (req,res) => {
        res.render('products/productCart')
    },
	detail: (req, res) => {
		res.render('detail', { productos: productService.getOne(req.params.id) })
	},
    altaProducto:(req,res) => {
        res.render('products/altaProducto')
    },
    create: (req, res) =>{
        res.render('altaProducto')
    },
    store: (req, res) => {
		req.body.image = req.file.filename;
		productService.save(req.body, req.file)
		res.redirect('/products/');
	},

    edit:(req,res) => {
        let productId = req.params.id;
        let producto = productService.getOne(productId);
        res.render('products/editProducto', {producto: producto})
    },

    update:(req,res) => {
        let productId = req.params.id;
        let updatedData = {
            nombre: req.body.nombre
        }
        productService.update(productId, updatedData);
        res.redirect('/productos');
    },
    eliminarProducto:(req,res) => {
        res.redirect('/productos');
    },
    listarProductos:(req,res) => {
        let productos = productService.products;
        console.log(productos);
        res.render('products/listarProductos',{productos:productos})
    },
    listarPorCategoria:(req,res) => {
        let productos = productService.listarPorCategoria(req);
        console.log(productos)
        res.render('products/listarPorCateg',{productos:productos});
    },

}

module.exports = productController;