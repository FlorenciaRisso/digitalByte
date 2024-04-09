const productService = require('../../data/productService');
const funcion = require('../../data/funcion')

async function validarStock(req,res,next) {
    let productId = req.query.id;
    let producto = await productService.getOne(productId);
    if (!producto || producto.Stock < req.query.cant || req.query.cant < 0) {
        let error={cantidadProducto:{msg:''}}
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