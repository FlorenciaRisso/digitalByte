const path = require('path');
const fs = require('fs');
const userService = require('../data/userService');
const bcrypt = require('bcrypt');
const db = require('../model/database/models');
const { log } = require('console');


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
        usuarioExiste.rol = userData.ro;
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
        userService.save(req).then(resultado => {
            console.log(resultado.errors);
            if (resultado.success) {
                res.redirect('/usuarios/login')
            } else if (resultado.errors) {
                res.render('usuarios/registro', {
                    errors: resultado.errors, oldData: old
                })
            }
            // else {
            //     res.render('usuarios/registro', {
            //         errors: resultado.errors.email, oldData: old
            //     })
            // }
        }).catch(error => {
            console.log(error);
        })

    },

    delete: (req, res) => {
        userService.delete(req);
        res.redirect('/usuarios/lista')
    },

    login: (req, res) => {
        res.render('usuarios/login');
    },

    processLogin: async (req, res) => {
        try {
            let usuarioValido = await userService.findByField('email', req.body.email);

            if (usuarioValido) {
                let correctContraseña = bcrypt.compareSync(req.body.contraseña, usuarioValido.contraseña);

                if (correctContraseña) {
                    req.session.usuarioLogeado = usuarioValido;
                    return res.redirect('/');
                }
            }
            return res.render('usuarios/login', {
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



    //     let usuarioValido = userService.validarUsuario(req);
    //     let errors = [];

    //     if (usuarioValido) {
    //         res.redirect('/usuarios');
    //     } else {
    //         errors.errors.push({
    //             type: 'field', value: req.body,
    //             msg: 'Usuario incorrecto',
    //             path: 'email', location: 'body'
    //         })
    //     }
    //     res.render('usuarios/login', {errors:errors.errors.mapped()});



    //     return res.render('login', { //MUESTRA ERROR EMAIL INEXISTENTE
    //         errors: {
    //             email: {
    //                 msg: "Email inexistente"
    //             }
    //         }
    //     });
    // },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/usuarios/login')
    },
}


module.exports = userController;