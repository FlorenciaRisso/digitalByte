const productService = require('../data/productService');
const interesadoService = require('../data/interesadoService');
const funcion = require('../data/funcion');
const { validationResult } = require('express-validator');

let mainController = {
    index: async function (req, res) {
        try {
            let data = await productService.getAll();
            let ultimosSamsung = await productService.getLastSmartphoneByMarca('Samsung');
            let ultimosXiaomi = await productService.getLastSmartphoneByMarca('Xiaomi');
            let ultimosApple = await productService.getLastSmartphoneByMarca('Apple');
            res.render('index', { ultimosApple: ultimosApple, ultimosXiaomi: ultimosXiaomi, ultimosSamsung: ultimosSamsung, productos: data, funcion: funcion })
        } catch (error) {
            console.log(error)
        }
    },

    contactos: function (req, res) {
        res.render('contacto');
    },
    formContacto: async function (req, res) {
        try {
            let errores = validationResult(req);
            if (!errores.isEmpty()) {
                return res.render('contacto', { respuesta: false });
            }
            let interesado = await interesadoService.save(req);
            let respuesta = interesado ? true : false;
            return res.render('contacto', { respuesta: respuesta });
        } catch (error) {
            console.log(error);
            return res.render('contacto', { respuesta: false });
        }
    },

    quienesSomos: function (req, res) {
        res.render('quienesSomos');
    }
}

module.exports = mainController;