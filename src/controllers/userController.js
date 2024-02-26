const userService = require('../data/userService');
const bcrypt = require('bcrypt');


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

    profile: (req, res) => {
        let userId = req.params.id;
        userService.getOne(userId).
            then(data => res.render('usuarios/userProfile', {
                usuario: data
            })).
            catch(error => res.status(404).send('Usuario no encontrado'))
    },

    userProfile: (req, res) => {
        userService.getOne(req.session.usuarioLogeado.id).

            then(data => {
                res.render('usuarios/userProfile', {
                    usuario: data
                })
            })
            .catch(e => console.log(e))
    },

    edit: (req, res) => {
        let userId = parseInt(req.params.id, 10);
        userService.getOne(userId).
            then(data => res.render('usuarios/edit', { usuario: data, oldData: data }))
    },

    update: (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userData = req.body;

        const usuarioExiste = userService.getOne(userId);
        if (!usuarioExiste) {
            return res.status(404).send('Usuario no encontrado');
        }

        usuarioExiste.nombre = userData.nombre;
        usuarioExiste.apellido = userData.apellido;
        usuarioExiste.email = userData.email;
        usuarioExiste.contraseña = userData.contraseña;
        usuarioExiste.rol = userData.rol;
        usuarioExiste.nacionalidad = userData.nacionalidad;
        usuarioExiste.avatar = '/img/' + req.file.filename;

        userService.update(usuarioExiste);

        res.redirect('/usuarios/lista');
    },

    cambiarContraseña: (req, res) => {
        res.render('usuarios/cambiarContraseña', {
            usuarioId: req.params.id
        })
    },

    updateContraseña: (req, res) => {
        userService.validarContraseña(req).
            then(resultado => {
                console.log(resultado);
                if (resultado.success) {
                    res.redirect('/usuarios/userProfile')
                } else if (resultado.errors) {
                    res.render('usuarios/cambiarContraseña', {
                        errors: resultado.errors,usuarioId:req.params.id
                    })
                }
            }).
            catch(error => console.log(error))
    },

    registro: (req, res) => {
        res.render('usuarios/registro');
    },



processRegister: (req, res) => {
    let old = req.body;
    userService.save(req).then(async resultado => {
        if (resultado.success) {
            // Iniciar sesión automáticamente después del registro
            try {
                // Obtener el usuario recién registrado
                const usuarioRegistrado = await userService.findByField('email', req.body.email);

                // Almacenar el usuario en la sesión
                req.session.usuarioLogeado = usuarioRegistrado;

                // Redirigir al usuario a la página principal o a donde desees
                res.redirect('/');
            } catch (error) {
                console.error('Error al iniciar sesión automáticamente después del registro:', error);
                res.status(500).send('Error al iniciar sesión automáticamente después del registro');
            }
        } else if (resultado.errors) {
            res.render('usuarios/registro', {
                errors: resultado.errors, oldData: old
            })
        }
    }).catch(error => {
        console.log(error);
    });
},

    delete: (req, res) => {
        userService.delete(req).then(resultado=>{
            if(req.session.usuarioLogeado.id==req.params.id){
                this.logout(req,res);
            }else{
                res.redirect('/usuarios/lista')
            }
        }).catch(error=>console.log(error));
        
    },

    login: (req, res) => {
        res.render('usuarios/login',{cookie: req.cookies.recordarme || ''});
    },

    processLogin: async (req, res) => {
        try {
            let usuarioValido = await userService.findByField('email', req.body.email);
    
            if (usuarioValido) {
                let correctContraseña = bcrypt.compareSync(req.body.contraseña, usuarioValido.contraseña);
    
                if (correctContraseña) {
                    req.session.usuarioLogeado = usuarioValido;
                    if(req.body.recordarme == 'on'){
                        res.cookie('recordarme',usuarioValido.email, { maxAge: 604800000 });
                        console.log('Cookie "recordame" establecida');
                    }
                    return res.redirect('/');
                }
            }
    
            return res.render('usuarios/login', {cookie:req.cookies.recordarme || '',
                errors: {
                    email: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
    
        } catch (error) {
            console.error('Error al procesar el inicio de sesión:', error);
            return res.status(500).send('Error al procesar el inicio de sesión');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/usuarios/login')
    },
}


module.exports = userController;