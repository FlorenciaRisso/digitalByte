const esVendedor = (req, res, next) => {

    const usuario = req.session.usuarioLog;

    const esVendedor = (usuario && usuario.rol === 'Vendedor');
    if(!esVendedor){
        return res.redirect('/')
    } next();
};

module.exports = esVendedor;