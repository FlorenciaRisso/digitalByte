const cartService = require('../data/cartService');
const productService = require('../data/productService')
const funcion = require('../data/funcion');
const { validationResult } = require('express-validator');

let cartController = {

    carrito: async function (req, res) {
        try {
            let productosCarrito = [];
            let carritoPendiente = await cartService.getCarritoPendiente(req.session.usuarioLog.id);
            if (carritoPendiente) {
                productosCarrito = await cartService.getProductosCarrito(carritoPendiente.id);
            }
            let data = await productService.getAll();
            let maxMasBuscados = 10;
            let masBuscados = data.slice(0, maxMasBuscados);
            res.render('productos/carrito', { carrito: carritoPendiente, productosCarrito: productosCarrito, masBuscados: masBuscados, funcion: funcion });
        } catch (error) {
            console.log(error);
        }
    },
    agregarAlCarrito: async function (req, res) {
        try {
            let idProducto = req.query.id;
            let carritoPendiente = await cartService.getCarritoPendiente(req.session.usuarioLog.id);
            if (carritoPendiente !== null) {
                console.log(1);
                await cartService.addProductoAlCarrito(carritoPendiente.id, idProducto);
            } else {
                console.log(2);
                carritoPendiente = await cartService.createCarrito(req.session.usuarioLog.id);
                await cartService.addProductoAlCarrito(carritoPendiente.id, idProducto);
            }
            return res.redirect(req.get('referer'));
        } catch (error){
            console.log(error);
            res.send(500).json({ error });
        }
    },
    actualizarCantidad: async function (req, res) {
        try {
            const { id, cantidad } = req.body;
            console.log(id, cantidad);
            await cartService.updateCantidad(id, cantidad);
            res.status(200).json({ mensaje: 'Cantidad actualizada correctamente' });
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = cartController;