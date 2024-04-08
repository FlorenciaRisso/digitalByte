const esCliente = (req, res, next) => {

    const usuario = req.session.usuarioLog;

    const esCliente = usuario && usuario.rol === 'Cliente';
    if(!esCliente){
        return res.redirect('/')
    } next();
};

module.exports = esCliente;