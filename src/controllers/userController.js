const path = require('path');
const fs = require('fs');
const userService = require('../data/userService');
const bcrypt = require('bcrypt');

let userController = {

    lista: (req, res) => {
        let usuarios = userService.users;
        res.render('usuarios/lista', { usuarios: usuarios })
    },

    profile: (req, res) => {
        let userId = parseInt(req.params.id, 10);
        const usuario = userService.getOne(userId);
        if (usuario) {
            res.render('usuarios/profile', { usuario: usuario });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    },

    userProfile: (req, res) => {
        return res.render('userProfile', {
            usuario: req.session.usuarioLogueado
        })
    },

    edit: (req, res) => {
        let userId = parseInt(req.params.id, 10);
        let usuario = userService.getOne(userId);
        res.render('usuarios/edit', { usuario: usuario });
    },

    update: (req, res) => {
        const userId = parseInt(req.params.id, 10);
        const userData = req.body;

        const usuarioExiste = userService.getOne(userId);
        if (!usuarioExiste) {
            return res.status(404).send('Usuario no encontrado');
        }

        usuarioExiste.firstName = userData.firstName;
        usuarioExiste.lastName = userData.lastName;
        usuarioExiste.email = userData.email;
        usuarioExiste.password = userData.password;
        usuarioExiste.rol = userData.category;
        usuarioExiste.country = userData.country;
        usuarioExiste.image = '/img/' + req.file.filename;

        userService.update(usuarioExiste);

        res.redirect('/usuarios/lista');
    },

    registro: (req, res) => {
        res.render('usuarios/registro');
    },

    processRegister: (req, res) => {
        let resultado = userService.save(req);
        if (resultado.success == true) {
            res.redirect('/usuarios/login')
        } else if (resultado.errors) {
            res.render('usuarios/registro', {
                errors: resultado.errors.mapped()
            })
        } else {
            res.render('usuarios/registro', {
                errors: resultado.errors.email
            })
        }
    },

    delete: (req, res) => {
        userService.delete(req);
        res.redirect('/usuarios/lista')
    },

    login: (req, res) => {
        console.log(req.session)
        res.render('usuarios/login');
    },





    processLogin: (req, res) => {
        let usuarioValido = userService.findByField('email', req.body.email);

        if (usuarioValido) {
            let correctPassword = bcrypt.compareSync(req.body.password, usuarioValido.password);
            if (correctPassword) {
                delete usuarioValido.password;
                req.session.usuarioLogueado = usuarioValido;
                return res.redirect('/usuario/userProfile')
            }
            return res.render('usuario/login', {
                errors: {
                    email: {
                        msg: 'Credenciales inválidas'
                    }
                }
            })
        }
        return res.render('usuario/login', {
            errors: {
                email: {
                    msg: 'Credenciales inválidas'
                }
            }
        })

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
        return res.redirect('/')
    },
}


module.exports = userController;