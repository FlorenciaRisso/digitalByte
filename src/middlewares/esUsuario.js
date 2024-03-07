const esUsuario = (req, res, next) => {

    const usuario = req.session.usuarioLogeado;

    const esUsuario = usuario && (usuario.rol === 'Vendedor' ||  usuario.rol ==='Cliente');
    if(!esUsuario){
        return res.redirect('/')
    } next();
};

module.exports = esUsuario;