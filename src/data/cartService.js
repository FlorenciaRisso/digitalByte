const db = require('../model/database/models');
const productService = require('./productService');

const cartService = {
    //funciona
    createCarrito: async function (idUser) {
        try {
            let carritoNuevo = await db.Carritos.create({
                ID_Usuario: idUser,
                Fecha_Creacion: new Date(),
                Total: '0.00'
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
    getDetalle: async function (idDetalle) {
        try {
            let detalle = await db.DetalleCarrito.findOne({
                where: {
                    id: idDetalle
                }, raw: true
            });
            return detalle;
        } catch (error) {
            console.log("Error al crear el carrito", error);
            return [];
        }
    },
    getBy: async function (whereClausure = {}) {
        return await db.Carritos.findAll({ where: whereClausure });
    },
    existeProductoEnCarrito: async function (idCar, idProd) {
        return await db.DetalleCarrito.findOne({
            where: {
                ID_Carrito: idCar,
                ID_Producto: idProd
            }
        })
    },
    calcularTotalCarritoIncremento: function (totalCarrito, precioProdu, descProdu, nuevaCantidad) {
        totalCarrito = parseFloat(totalCarrito);
        let precioConDescuento = parseFloat(precioProdu) - (parseFloat(precioProdu) * (descProdu / 100));
        let totalDetalle = 0;
        totalDetalle=( nuevaCantidad!==0 ? nuevaCantidad * precioConDescuento : 0);
        let nuevoTotalCarrito = totalCarrito + totalDetalle;
        return nuevoTotalCarrito
    },
    calcularTotalCarritoDecremento: function (totalCarrito, precioProdu, descProdu, nuevaCantidad) {
        totalCarrito = parseFloat(totalCarrito);
        let precioConDescuento = parseFloat(precioProdu) - (parseFloat(precioProdu) * (descProdu / 100));
        let totalDetalle = nuevaCantidad * precioConDescuento;
        let nuevoTotalCarrito = totalCarrito - totalDetalle;
        return nuevoTotalCarrito
    },
    addProductoAlCarrito: async function (idCarrito, idProducto, cantidad) {
        try {
            
            let nuevoTotalCarrito;
            let producto = await db.Productos.findByPk(idProducto);
            if (!producto) {
                throw new Error('No se encontró el producto');
            }
            const existeProducto = await this.existeProductoEnCarrito(idCarrito, idProducto);
            const existeCarrito = await this.getBy({ id: idCarrito });
            let cantidadASumar=0;
            let b=0;
            if (existeProducto) {
                //Guardo la diferencia entre la cantidad que hay en el carrito y la que viene por paramet
                await db.DetalleCarrito.update(
                    { Cantidad: parseInt(cantidad) + existeProducto.Cantidad },
                    {
                        where: {
                            ID_Producto: idProducto,
                            ID_Carrito: idCarrito
                        }
                    }
                );
            } else {
                await db.DetalleCarrito.create({
                    ID_Carrito: idCarrito,
                    ID_Producto: idProducto,
                    Cantidad: parseInt(cantidad)
                });
                b=1;
            }
            productoDetalle = await db.DetalleCarrito.findOne({ where: { ID_Carrito: idCarrito, ID_Producto: idProducto } });
            if(b==1){
                cantidadASumar=productoDetalle.Cantidad;
            }else{
                cantidadASumar=productoDetalle.Cantidad - parseInt(cantidad)
            }
            nuevoTotalCarrito = this.calcularTotalCarritoIncremento(existeCarrito[0].Total, producto.Precio, producto.Descuento, cantidadASumar)
            return await db.Carritos.update({ Total: nuevoTotalCarrito }, { where: { id: idCarrito } });
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    },
    //TODO: Cuandop quito detalles eliminar carrito si queda vacio
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
    getCantidadByIdProdIdCart: async function (idCarrito, idProd) {
        try {
            const cantidadProducto = await db.DetalleCarrito.findOne({
                where: { ID_Producto: idProd, ID_Carrito: idCarrito },
                raw: true
            });
            return cantidadProducto;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    updateCantidad: async function (idDetalleProducto, nuevaCantidad) {
        try {
            let detalleProductoAnterior = await db.DetalleCarrito.findByPk(idDetalleProducto);
            let producto = await db.Productos.findByPk(detalleProductoAnterior.ID_Producto);
            if (nuevaCantidad > producto.Stock) {
                throw new Error('La cantidad es mayor que el stock disponible');
            }
            await db.DetalleCarrito.update({ Cantidad: nuevaCantidad }, { where: { id: idDetalleProducto } });
            let detalleProductoActualizado = await db.DetalleCarrito.findByPk(idDetalleProducto);
            let diferenciaCantidad = nuevaCantidad - detalleProductoAnterior.Cantidad;
            let carrito = await db.Carritos.findByPk(detalleProductoActualizado.ID_Carrito);
            let nuevoTotalCarrito = carrito.Total;

            if (diferenciaCantidad < 0) { // Si estás decrementando la cantidad
                nuevoTotalCarrito = this.calcularTotalCarritoDecremento(carrito.Total, producto.Precio, producto.Descuento, Math.abs(diferenciaCantidad))
            } else if (diferenciaCantidad > 0) { // Si estás incrementando la cantidad
                nuevoTotalCarrito = this.calcularTotalCarritoIncremento(carrito.Total, producto.Precio, producto.Descuento, Math.abs(diferenciaCantidad))
            }

            // Actualizar el total del carrito en la base de datos
            return await db.Carritos.update({ Total: nuevoTotalCarrito }, { where: { id: carrito.id } });

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    delete: async function (id) {
        try {
            let detalleEliminar = await this.getDetalle(id);
            if (!detalleEliminar) {
                throw new Error('No se encontró el detalle del producto a eliminar');
            }

            let productoEliminar = await db.Productos.findByPk(detalleEliminar.ID_Producto);
            if (!productoEliminar) {
                throw new Error('No se encontró el producto a eliminar');
            }
            await db.DetalleCarrito.destroy({ where: { id: id } });

            let carrito = await db.Carritos.findByPk(detalleEliminar.ID_Carrito);
            if (!carrito) {
                throw new Error('No se encontró el carrito asociado al detalle del producto eliminado');
            }

            let nuevoTotalCarrito = this.calcularTotalCarritoDecremento(carrito.Total, productoEliminar.Precio, productoEliminar.Descuento, detalleEliminar.Cantidad);

            await db.Carritos.update({ Total: nuevoTotalCarrito }, { where: { id: carrito.id } });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


}
module.exports = cartService;