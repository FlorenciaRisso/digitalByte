const productService = require('../../data/productService');
const cartService = require('../../data/cartService');
const funcion = require('../../data/funcion');

async function validarStockAdd(req,res,next) {
    let cantidadCarrito=0;
    let miProducto={}
    let productId = parseInt(req.query.id);
    let cantidad=parseInt(req.query.cant);
    let miCarrito = await cartService.getCarritoPendiente(req.session.usuarioLog.id);
    let producto = await productService.getOne(productId);
    if (miCarrito && producto){
        miProducto=await cartService.getCantidadByIdProdIdCart(miCarrito.id,producto.ID_Producto);
        if(miProducto){
            cantidadCarrito=miProducto.Cantidad;
        }
    }
    if (!producto || producto.Stock < cantidad || cantidad <= 0 || (cantidadCarrito + cantidad > producto.Stock)) {
        if( cantidad <= 0){
            error = {
                cantidadProducto: {
                    msg:'Cantidad Invalida'
                }
            }
        }else{
            error = {
                cantidadProducto: {
                    msg: 'Stock insuficiente'
                }
            }
        }
        let relacionados = await productService.getProdPorCat(producto.ID_Categoria);
        let maxRelacionados = 6;
        relacionados = relacionados.slice(0, maxRelacionados);
        if (!producto) {
            res.status(404).render('error404');
        }
        return res.render('productos/detalle', { error: error, relacionados: relacionados, producto: producto, funcion: funcion });
    }
    next();
}
module.exports = validarStockAdd;