const productService = require('../data/productService');
const funcion = require('../data/funcion')

let mainController = {
    index: (req, res) => {
        productService.getAll(req).
            then(data => {res.render('index', { productos: data, funcion: funcion }) }).
            catch(error => { console.log(error) })
    },

    contactos: (req, res) => {
        res.render('contacto');
    },

    quienesSomos: (req, res) => {
        res.render('quienesSomos');
    }
}

module.exports = mainController;