function guestMiddleware(req, res, next){
    if(req.session.usuarioLogeado){
        return res.redirect('/')
    } next();
}

module.exports = guestMiddleware;