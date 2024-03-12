const esAdmin = (req, res, next) => {

    const usuario = req.session.usuarioLogeado;

    const esAdmin = (usuario && usuario.rol === 'Administrador');
    console.log(esAdmin);
    if(!esAdmin){
        return res.redirect('/')
    } next();
};

module.exports = esAdmin;