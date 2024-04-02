const productService = require('../data/productService');
const funcion = require('../data/funcion')

let mainController = {
    index: async function (req, res){
        try {
            let data = await productService.getAll();
            let ultimosSamsung= await productService.getLastSmartphoneByMarca('Samsung');
            let ultimosXiaomi=await productService.getLastSmartphoneByMarca('Xiaomi');
            let ultimosApple=await productService.getLastSmartphoneByMarca('Apple');
            res.render('index', { ultimosApple:ultimosApple,ultimosXiaomi:ultimosXiaomi,ultimosSamsung:ultimosSamsung,productos: data, funcion: funcion })
        } catch (error) {
            console.log(error)
        }
    },

    contactos: function (req, res){
        res.render('contacto');
    },
    formContacto:function(req,res){

    },
    quienesSomos:function (req, res){
        res.render('quienesSomos');
    }
}

module.exports = mainController;