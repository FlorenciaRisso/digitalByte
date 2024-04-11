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
                productosCarrito.forEach(carrito => {
                    let precioConDescuento = carrito.producto.Precio - (carrito.producto.Precio * (carrito.producto.Descuento / 100));
                    carrito.producto.PrecioConDescuento = precioConDescuento;
                    carrito.producto.SubtotalConDescuento = precioConDescuento * carrito.Cantidad;
                });
            }
            let data = await productService.getAll();
            let maxMasBuscados = 10;
            let masBuscados = data.slice(0, maxMasBuscados);
            res.render('productos/carrito', { carrito: carritoPendiente, productosCarrito: productosCarrito, masBuscados: masBuscados, funcion: funcion });
        } catch (error) {
            console.log(error);
        }
    },
    cantidadItems: async function (req, res) {
        try {
            let cantidadItems = await cartService.cantidadItemsCarrito(req.session.usuarioLog.id);
            res.json(cantidadItems);
        } catch (error) {
            console.log(error);
        }
    },
    agregarAlCarrito: async function (req, res) {
        try {
            let idProducto = parseInt(req.query.id);
            let cantidad = parseInt(req.query.cant);
            let carritoPendiente = await cartService.getCarritoPendiente(req.session.usuarioLog.id);
            if (carritoPendiente !== null) {
                await cartService.addProductoAlCarrito(carritoPendiente.id, idProducto, cantidad);
            } else {
                carritoPendiente = await cartService.createCarrito(req.session.usuarioLog.id);
                await cartService.addProductoAlCarrito(carritoPendiente.id, idProducto, cantidad);
            }
            return res.redirect(req.get('referer')+'?added=true');
        } catch (error) {
            console.log(error);
            res.send(500).json({ error });
        }
    },
    actualizarCantidad: async function (req, res) {
        try {
            const { id, cantidad } = req.body;
            await cartService.updateCantidad(id, cantidad);
            res.status(200).json({ mensaje: 'Cantidad actualizada correctamente' });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message })
        }
    },
    eliminarDetalleCarrito: async function (req, res) {
        try {
            const id = req.query.id;
            await cartService.delete(id);
            res.status(200).json({ mensaje: 'Cantidad actualizada correctamente' });
        } catch (error) {
            console.error(error);
        }
    },
    comprar: async function (req, res) { 
        try { 
            const userId = req.session.usuarioLog.id; 

            const carritoPendiente = await cartService.getCarritoPendiente(userId); 

            if (!carritoPendiente) { 
                throw new Error('No hay un carrito pendiente para este usuario'); 
            } 
            await cartService.finalizarCompra(carritoPendiente.id); 

            let carritoDetalles = await cartService.getCarritoyDetalle(userId)
            
            res.redirect('/productos/misCompras'); 
        } catch (error) { 
            console.error('Error al realizar la compra:', error); 
            res.status(500).send('Error al realizar la compra'); 
        } 
    }
}

module.exports = cartController;