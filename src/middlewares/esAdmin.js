const storeUserMiddleware = (req, res, next) => {
    // Supongamos que obtienes los datos del usuario de la sesión
    const usuario = req.session.usuario; // Esto depende de cómo esté configurada tu aplicación de sesión

    // Verificar si el usuario tiene el rol de administrador
    const esAdmin = usuario && usuario.rol === 'administrador';

    // Adjuntar los datos del usuario, incluido el rol de administrador, al objeto de solicitud
    req.usuario = {
        ...usuario,
        esAdmin: esAdmin
    };

    // Continuar con el siguiente middleware o la siguiente ruta
    next();
};

module.exports = storeUserMiddleware;