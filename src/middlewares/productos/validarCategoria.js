let productService = require('../../data/productService')
const validarCategoria = async (req, res, next) => {
    
    let categorias = await productService.getCategorias();

    let idsCategorias=categorias.map(e=> e.id.toString());
    let categoriaEnviada = req.query.cat;

    if (!idsCategorias.includes(categoriaEnviada)) {
        return res.status(404).render('error404');
    }

    next();
};

module.exports = validarCategoria;