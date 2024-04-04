const esUsuarioOAdmin = (req, res, next) => {

    const permiso = req.session.usuarioLogeado.id==req.params.id;
    const usuario= req.session.usuarioLogeado;

    const esUsuario = permiso && (usuario.rol === 'Vendedor' ||  usuario.rol ==='Cliente' || usuario.rol ==='Administrador');
    if(!esUsuario){
        res.status(403).render('error403');
    } next();
};

module.exports = esUsuarioOAdmin;