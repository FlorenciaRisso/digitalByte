const esVendedorOAdmin = (req, res, next) => {

    const usuario = req.session.usuarioLogeado;

    const esVendedor = (usuario && usuario.rol === 'Vendedor') || usuario.rol==='Administrador';
    
    if(!esVendedor){
        console.log(esVendedor)
        return res.redirect('/')
    } next();
};

module.exports = esVendedorOAdmin;