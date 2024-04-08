const esVendedorOAdmin = (req, res, next) => {

    const usuario = req.session.usuarioLog;

    const esVendedor = (usuario && usuario.rol === 'Vendedor') || usuario.rol==='Administrador';
    
    if(!esVendedor){
        return res.redirect('/')
    } next();
};

module.exports = esVendedorOAdmin;