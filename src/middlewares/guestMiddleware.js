function guestMiddleware(req, res, next){
    if(req.session.usuarioLogueado){
        return res.redirect('/usuarios/userProfile')
    } next();
}

module.exports = guestMiddleware;