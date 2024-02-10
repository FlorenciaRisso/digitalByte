function authMiddleware(req, res, next){
    if(!req.session.usuarioLogeado){
        return res.redirect('/usuarios/login')
    } next();
}

module.exports = authMiddleware;