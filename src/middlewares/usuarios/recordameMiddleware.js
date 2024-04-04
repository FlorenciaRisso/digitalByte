const { Usuarios } = require('../../model/database/models');

function recordame(req, res, next) {

if (req.cookies.recordame != undefined && req.session.usuarioLog == undefined) {
    Usuarios.findOne({
        where: {
            email: req.cookies.recordame
        }
    }).then(usuario => {
        if (usuario) {
            req.session.usuarioLog = usuario;
        }
        next();
    }).catch(error => {
        console.error('Error al buscar usuario:', error);
        next(error);
    });
} else {
    next();
}

}

module.exports = recordame;