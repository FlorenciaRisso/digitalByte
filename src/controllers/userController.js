const path = require('path');
const fs = require('fs');
const userService = require('../data/userService');
const bcrypt = require('bcrypt');
const { log } = require('console');


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
        let usuario=userService.getOne(req.session.usuarioLogeado);
        console.log(usuario);
        return res.render('usuarios/userProfile', {
            usuario: usuario
        })
    },

    edit: (req, res) => {
        let userId = parseInt(req.params.id, 10);
        let usuario = userService.getOne(userId);
        res.render('usuarios/edit', { usuario: usuario,oldData:usuario });
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
        let old=req.body;
        if (resultado.success == true) {
            res.redirect('/usuarios/login')
        } else if (resultado.errors) {
            res.render('usuarios/registro', {
                errors: resultado.errors.mapped(),oldData:old
            })
        } else {
            res.render('usuarios/registro', {
                errors: resultado.errors.email, oldData:old
            })
        }
    },

    delete: (req, res) => {
        userService.delete(req);
        res.redirect('/usuarios/lista')
    },

    login: (req, res) => {
        res.render('usuarios/login');
    },

    processLogin: (req, res) => {
        let usuarioValido = userService.findByField('email', req.body.email);
        console.log(usuarioValido);
        if (usuarioValido) {
            let correctPassword = bcrypt.compareSync(req.body.password, usuarioValido.password);
            console.log(correctPassword);
            if (correctPassword) {
                req.session.usuarioLogeado = usuarioValido.id;
                return res.redirect('/')
            }
        }
        return res.render('usuarios/login', {
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
        console.log(req.session);
        req.session.destroy();
        return res.redirect('/usuarios/login')
    },
}


module.exports = userController;