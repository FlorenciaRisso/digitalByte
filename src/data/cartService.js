const db = require('../model/database/models');
const Sequelize = require('sequelize');
const productService = require('./productService');

const cartService = {

    createCarrito: async function (idUser) {
        try {
            let carritoNuevo = await db.Carritos.create({
                ID_Usuario: idUser,
                Fecha_Creacion: new Date(),
                Total:'0.00'
            });
            return carritoNuevo;
        } catch (error) {
            console.log("Error al crear el carrito", error);
            return [];
        }
    },
    getCarritoPendiente: async function (idUser) {
        try {
            let carrito = await db.Carritos.findOne({
                where: {
                    ID_Usuario: idUser,
                    Estado: 0
                }, raw: true
            });
            return carrito;
        } catch (error) {
            console.log("Error al crear el carrito", error);
            return [];
        }
    },
    addProductoAlCarrito: async function (idCarrito, idProducto) {
        try {
            let nuevoDetalleCarrito = await db.DetalleCarrito.create({
                ID_Carrito: idCarrito,
                ID_Producto: idProducto,
                Cantidad: 1
            });
            return nuevoDetalleCarrito;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    },
    getProductosCarrito: async function (idCart) {
        try {
            const productosCarrito = await db.DetalleCarrito.findAll({
                where: { ID_carrito: idCart },
                raw: true
            });

            if (!productosCarrito || productosCarrito.length === 0) {
                throw 'No hay productos en este carrito';
            }

            for (let producto of productosCarrito) {
                const data = await productService.getOne(producto.ID_Producto);
                producto.producto = data;
            }
            return productosCarrito;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    updateCantidad: async function (idDetalleProducto, cantidad) {
        try {
            const detalleProducto = await db.DetalleCarrito.findByPk(idDetalleProducto);
            if (!detalleProducto) {
                throw new Error('Elemento del carrito no encontrado');
            }
            detalleProducto.Cantidad = cantidad;
            await this.actualizarTotalCarrito(detalleProducto.ID_Carrito,detalleProducto.ID_Producto,cantidad);
            await detalleProducto.save();
            return detalleProducto;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
//TODO: En la primer carga de detalle junto a la creaicon del carrito no guarda el idDelCarrito
//Validar Stock antes de agregar, Mostrar precio con descuento si lo tiene 
//Tachas precios en detalle
module.exports = cartService;