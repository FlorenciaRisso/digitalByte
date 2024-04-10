const db = require('../model/database/models');
const productService = require('./productService');

const cartService = {
    //funciona
    createCarrito: async function (idUser) {
        try {
            let carritoNuevo = await db.Carritos.create({
                ID_Usuario: idUser,
                Fecha_Creacion: new Date(),
                Total: 0
            });
            return carritoNuevo;
        } catch (error) {
            console.log("Error al crear el carrito", error);
            return [];
        }
    },
    //funciona
    cantidadItemsCarrito: async function (id) {
        try {
            let cantidad = 0;
            let productosCarrito;
            let carrito = await db.Carritos.findOne({
                where: {
                    ID_Usuario: id,
                    Estado: 0
                }, raw: true
            });
            if (carrito) {
                productosCarrito = await db.DetalleCarrito.findAll({
                    where: { ID_carrito: carrito.id },
                    raw: true
                });
                cantidad = productosCarrito.length
            };
            return cantidad;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    //funciona
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

    addProductoAlCarrito: async function (idCarrito, idProducto, cantidad) {
        try {
            let nuevoDetalleCarrito = await db.DetalleCarrito.create({
                ID_Carrito: idCarrito,
                ID_Producto: idProducto,
                Cantidad: cantidad
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
    getCantidadByIdProdIdCart: async function (idCarrito,idProd) {
        try {
            const cantidadProducto = await db.DetalleCarrito.findOne({
                where: { ID_Producto: idProd,ID_Carrito:idCarrito },
                raw: true
            });
            return cantidadProducto;
        } catch (error) {
            console.log(error);
            return[];
        }
    },
    updateCantidad: async function (idDetalleProducto, cantidad) {
        try {
            const detalleProducto = await db.DetalleCarrito.findByPk(idDetalleProducto);
            if (!detalleProducto) {
                throw new Error('Elemento del carrito no encontrado');
            }
            detalleProducto.Cantidad = cantidad;
            await this.actualizarTotalCarrito(detalleProducto.ID_Carrito, detalleProducto.ID_Producto, cantidad);
            await detalleProducto.save();
            return detalleProducto;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    delete: async function (id) {
        try {
            return await db.DetalleCarrito.destroy({ where: { id: id } });
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}
module.exports = cartService;