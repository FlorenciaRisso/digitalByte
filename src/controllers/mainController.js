const path = require('path');
const productService = require('../data/productService');
const funcion=require('../data/funcion')

let mainController = {
    index: (req, res)=>{
        let productos=productService.getAll();
        res.render('index',{productos:productos,funcion:funcion});
    }, 

    contactos: (req, res) => {
        res.render('contacto');
    },

    quienesSomos: (req,res) => {
        res.render('quienesSomos');
    }
}

module.exports = mainController;