const esAdmin = (req, res, next) => {

    const usuario = req.session.usuarioLog;

    const esAdmin = (usuario && usuario.rol === 'Administrador');
    if(!esAdmin){
        return res.redirect('/')
    } next();
};

module.exports = esAdmin;