const productService = require('../../data/productService');
const cartService = require('../../data/cartService');
const funcion = require('../../data/funcion');

async function validarStockUpd(req, res, next) {
    let cantidadDetalle = 0;
    let detalleId = parseInt(req.body.id);
    let cantidad = parseInt(req.body.cantidad);

    let miDetalle = await cartService.getDetalle(detalleId);
    if (!miDetalle) {
        let error = {
            cantidadProducto: {
                msg: 'No se encontró el detalle'
            }
        };
        return res.status(400).json({ error });
    }

    let producto = await productService.getBy({ ID_Producto: miDetalle.ID_Producto });
    if (!producto) {
        return res.status(404).json({ error: { cantidadProducto: { msg: 'Producto no encontrado' } } });
    }

    cantidadDetalle = miDetalle.Cantidad;
    if (cantidad < 0 || cantidadDetalle + cantidad > producto.Stock) {
        let errorMsg = cantidad < 0 ? 'Monto inválido' : 'Stock insuficiente';
        return res.status(400).json({ error: { cantidadProducto: { msg: errorMsg } } });
    }

    next();
}

module.exports = validarStockUpd;
