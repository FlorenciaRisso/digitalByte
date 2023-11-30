const path = require('path');

let productController = {
    index: (req, res)=>{
        res.render('productCart')
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del producto " + req.params.id);
    },

    carrito: (req,res) => {
        res.sendFile(path.resolve(__dirname, '../views/productCart.ejs'));
    }
}

module.exports = productController;