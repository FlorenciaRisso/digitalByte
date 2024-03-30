const productService = require('../data/productService');
const funcion = require('../data/funcion')

let mainController = {
    index: async (req, res) => {
        try {
            let data = await productService.getAll();
            let ultimosSamsung= await productService.getSmartphoneByMarca('Samsung');
            let ultimosXiaomi=await productService.getSmartphoneByMarca('Xiaomi');
            let ultimosApple=await productService.getSmartphoneByMarca('Apple');
            res.render('index', { ultimosApple:ultimosApple,ultimosXiaomi:ultimosXiaomi,ultimosSamsung:ultimosSamsung,productos: data, funcion: funcion })
        } catch (error) {
            console.log(error)
        }
    },

    contactos: (req, res) => {
        res.render('contacto');
    },

    quienesSomos: (req, res) => {
        res.render('quienesSomos');
    }
}

module.exports = mainController;