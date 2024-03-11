const esUsuarioOAdmin = (req, res, next) => {

    const usuario = req.session.usuarioLogeado;

    const esUsuario = usuario && (usuario.rol === 'Vendedor' ||  usuario.rol ==='Cliente' || usuario.rol ==='Administrador');
    if(!esUsuario){
        return res.redirect('/')
    } next();
};

module.exports = esUsuarioOAdmin;