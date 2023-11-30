const path = require('path');

let mainController = {
    index: (req, res)=>{
        res.render('index')
    }, 

    contactos: (req, res) => {
        res.render('contacto')
    },

    quienesSomos: (req,res) => {
        res.render('quienes-somos')
    }
}

module.exports = mainController;