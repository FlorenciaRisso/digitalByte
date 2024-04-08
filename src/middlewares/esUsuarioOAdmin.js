const esUsuarioOAdmin = (req, res, next) => {

    const permiso = req.session.usuarioLog.id==req.params.id;
    const usuario= req.session.usuarioLog;

    const esUsuario = usuario && (usuario.rol === 'Vendedor' ||  usuario.rol ==='Cliente' || usuario.rol ==='Administrador');
    if(!esUsuario && !permiso && !usuario.rol === 'Administrador'){
        res.status(403).render('error403');
    } next();
};

module.exports = esUsuarioOAdmin;