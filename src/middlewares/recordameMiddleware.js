const { Usuarios } = require('../model/database/models');

function recordame(req, res, next) {

if (req.cookies.recordame != undefined && req.session.usuarioLogeado == undefined) {
    Usuarios.findOne({
        where: {
            email: req.cookies.recordame
        }
    }).then(usuario => {
        if (usuario) {
            // Si se encuentra el usuario, almacénalo en la sesión
            req.session.usuarioLogeado = usuario;
        }
        // Continúa con el siguiente middleware
        next();
    }).catch(error => {
        // Manejo de errores
        console.error('Error al buscar usuario:', error);
        next(error);
    });
} else {
    // Si no se cumplen las condiciones, continúa con el siguiente middleware
    next();
}

}

module.exports = recordame;