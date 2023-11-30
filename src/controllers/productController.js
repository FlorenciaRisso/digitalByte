const path = require('path');

let productController = {
    index: (req, res)=>{
        res.render('index')
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del producto " + req.params.id);
    },

    carrito: (req,res) => {
        res.render('productCart')
    },
    detalle:(req,res) => {
        res.render('productDetail')
    }
}

module.exports = productController;