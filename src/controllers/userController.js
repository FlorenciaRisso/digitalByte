const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

const users = require('../data/userService')

const userService = require('../data/userService');

let userController = {

    lista: (req, res) => {
        let usuarios = userService.users;
        res.render('usuarios/lista', { usuarios: usuarios })
    },

    profile: (req, res) => {
        console.log('Usuario en sesión:', req.session.usuarioLogueado);
        res.render('usuarios/profile', { usuario: req.session.usuarioLogueado })
    },

    edit: (req, res) => {
        let userId = req.params.id;
        let usuario = userService.getOne(userId);
        res.render('usuarios/editar', { usuario: usuario });
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
            res.render('usuarios/registro',{
                errors: resultado.errors.email
            })
        }
    },


    login: (req, res) => {
        console.log(req.session)
        res.render('usuarios/login');
    },

    processLogin: (req, res) => {
        let userToLogin = users.findByField('email', req.body.email); // BUSQUEDA EMAIL EXISTENTE

        if (userToLogin) {
            let correctPassword = bcrypt.compareSync(req.body.password, userToLogin.password) //VERIFICA CONTRASEÑA

            if (correctPassword) { //SI LA CONTRASEÑA ES CORRECTA, REDIRECCIONA AL PERFIL DEL USUARIO
                delete userToLogin.password
                req.session.usuarioLogueado = userToLogin
                return res.redirect('/usuarios/profile');
            }

            return res.render('usuarios/login', { //REDIRECCIONA A LA MISMA PAGINA Y MUESTRA LOS ERRORES
                errors: {
                    email: {
                        msg: "Datos incorrectos"
                    }
                }
            });
        }


        return res.render('login', { //MUESTRA ERROR EMAIL INEXISTENTE
            errors: {
                email: {
                    msg: "Email inexistente"
                }
            }
        });
    },



}

module.exports = userController;