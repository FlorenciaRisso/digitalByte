const userService = require('../data/userService');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


let userController = {

    lista: async function (req, res) {
        try {
            const usuarios = await userService.getAll();
            res.render('usuarios/lista', { usuarios: usuarios });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send('Error al obtener usuarios');
        }
    },
    filtro: async function (req, res) {
        try {
            const usuarios = await userService.getUsuarios(req);
            res.render('usuarios/lista', { usuarios: usuarios });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).send('Error al obtener usuarios');
        }
    },
    profile: async function (req, res) {
        try {
            let userId = req.params.id;
            let data = await userService.getOne(userId)
            res.render('usuarios/userProfile', {
                usuario: data
            })
        } catch (error) {
            res.status(404).send('Usuario no encontrado')
        }
    },

    userProfile: async function (req, res) {
        try {
            let data = await userService.getOne(req.session.usuarioLogeado.id)
            res.render('usuarios/userProfile', {
                usuario: data
            })
        } catch (error) {
            console.log(error)
        }
    },

    edit: async function (req, res) {
        try {
            let userId = parseInt(req.params.id, 10);
            let data = await userService.getOne(userId);
            res.render('usuarios/edit', { usuario: data, oldData: data });
        } catch (error) {
            console.log(error);
        }
    },

    update: async function (req, res) {
        try {
            let error = validationResult(req);
            let usuarioId = req.body.id;
            let sessionUsuarioId = req.session.usuarioLogeado ? req.session.usuarioLogeado.id : null;
            let usuarioActualizado;

            let data = {
                id: req.body.id,
                nombre: req.body.firstName,
                apellido: req.body.lastName,
                email: req.body.email,
                rol: req.body.rol,
                nacionalidad: req.body.country,
                avatar: req.body.oldImage,
                estado:req.body.estado
            };
            if (sessionUsuarioId == usuarioId && error.isEmpty()) {
                delete req.session['usuarioLogeado'];
                usuarioActualizado = await userService.update(req);
                let usuarioActualizadoData = await userService.getOne(req.params.id);
                req.session.usuarioLogeado = usuarioActualizadoData;
                res.redirect('/usuarios/userProfile');
            } else if (error.isEmpty()) {
                usuarioActualizado = await userService.update(req);
                res.redirect('/usuarios/lista');
            } else {
                // Mostrar la vista de edición con los errores
                res.render('usuarios/edit', { fileValidationError: req.fileValidationError, oldData: data, errors: error.mapped() })
            }
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
        }
    },


    cambiarContraseña: function (req, res) {
        res.render('usuarios/cambiarContraseña', {
            usuarioId: req.params.id
        })
    },

    updateContraseña: async function (req, res) {
        try {
            let resultado = await userService.validarContraseña(req)
            if (resultado.success) {
                res.redirect('/usuarios/userProfile')
            } else if (resultado.errors) {
                res.render('usuarios/cambiarContraseña', {
                    errors: resultado.errors, usuarioId: req.params.id
                })
            }
        } catch (error) { console.log(error) }
    },

    registro: function (req, res) {
        res.render('usuarios/registro');
    },

    processRegister: async function (req, res) {
        try {
            let old = req.body;
            if (req.file) {
                old.avatar = req.file.filename;
            }
            let errores = validationResult(req);
            if (errores.isEmpty() && req.fileValidationError === undefined) {
                try {
                    let usuarioRegistrado=await userService.save(req);
                    req.session.usuarioLogeado = usuarioRegistrado;
                    res.redirect('/');
                } catch (error) {
                    console.error('Error al iniciar sesión automáticamente después del registro:', error);
                    res.status(500).send('Error al iniciar sesión automáticamente después del registro');
                }
            } else {
                console.log(errores);
                res.render('usuarios/registro', {fileValidationError: req.fileValidationError,
                    errors: errores.mapped(), oldData: old
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    deleteCuenta: async function (req, res) {
        try {
            const userId = req.params.id;
            if (req.session.usuarioLogeado.id == userId) {
                let usuario = await userService.delete(userId);
                if (usuario) {
                    res.redirect('/usuarios/cerrarSesion')
                } else {
                    res.redirect("/");
                }
            } else if (req.session.usuarioLogeado.rol == "Administrador" && req.session.usuarioLogeado.id != userId) {
                await userService.delete(userId);
                res.redirect('/usuarios/lista')
            } else {
                //error usted no tiene permisos para realizar esta operacion
                res.redirect("/")
            }
        } catch (error) {
            console.log(error);
        }
    },

    login: function (req, res) {
        res.render('usuarios/login', { cookie: req.cookies.recordarEmail || '' });
    },

    processLogin: async function (req, res) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('usuarios/login', {
                    cookie: req.cookies.recordarEmail || '',
                    errors: errors.mapped()
                })
            }
            let usuarioValido = await userService.findByField('email', req.body.email);

            if (usuarioValido) {
                let correctContraseña = bcrypt.compareSync(req.body.contraseña, usuarioValido.contraseña);

                if (correctContraseña) {
                    req.session.usuarioLogeado = usuarioValido;
                    if (req.body.recordame == 'on') {
                        res.cookie('recordame', usuarioValido.email, { maxAge: 604800000 });
                        res.cookie('recordarEmail', usuarioValido.email, { maxAge: 604800000 });
                    }
                    return res.redirect('/');
                } else {
                    return res.render('usuarios/login', {
                        cookie: req.cookies.recordarEmail || '',
                        errors: {
                            email: {
                                msg: 'Credenciales inválidas'
                            }
                        }
                    }
                    )
                }
            }

        } catch (error) {
            console.error('Error al procesar el inicio de sesión:', error);
            return res.status(500).send('Error al procesar el inicio de sesión');
        }
    },

    verificarEmail: async function (req, res) {
        const email = req.body.email;
        let existe = await userService.findByField('email', email);

        res.json({ existe });
    },


    logout: function (req, res) {
        res.clearCookie('recordame')
        req.session.destroy();
        return res.redirect('/usuarios/login')
    },
}


module.exports = userController;