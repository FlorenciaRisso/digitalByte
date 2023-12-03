const path = require('path');

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
        res.render('products/editProducto')
    }
}

module.exports = productController;