function guestMiddleware(req, res, next){
    if(req.session.usuarioLog){
        return res.redirect('/')
    } next();
}

module.exports = guestMiddleware;