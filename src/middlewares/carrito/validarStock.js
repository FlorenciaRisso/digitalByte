const productService = require('../../data/productService');
const cartService = require('../../data/cartService');
const funcion = require('../../data/funcion');

async function validarStock(req,res,next) {
    let cantidadCarrito=0;
    let miProducto={}
    let productId = req.query.id;
    let miCarrito = await cartService.getCarritoPendiente(req.session.usuarioLog.id);
    let producto = await productService.getOne(productId);
    if (miCarrito && producto){
        console.log("entro aqui");
        miProducto=await cartService.getCantidadByIdProdIdCart(miCarrito.id,producto.ID_Producto);
        if(miProducto){
            cantidadCarrito=miProducto.Cantidad;
        }
    }
    if (!producto || producto.Stock < req.query.cant || req.query.cant < 0 || (cantidadCarrito + req.query.cant > producto.Stock)) {
        if( req.query.cant < 0){
            error = {
                cantidadProducto: {
                    msg: 'Monto Invalido'
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
module.exports = validarStock