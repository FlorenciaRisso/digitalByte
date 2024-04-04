function authMiddleware(req, res, next){
    if(!req.session.usuarioLog){
        return res.redirect('/usuarios/login')
    } next();
}

module.exports = authMiddleware;