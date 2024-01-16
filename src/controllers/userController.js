const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const users = require('../data/userService')
const bcryptjs = require('bcryptjs');

let userController = {

    profile: (req, res) => {
        res.render('usuarios/profile', {usuario: req.session.usuarioLogueado})
    },

    lista: (req, res) => {
        res.render('usuarios/lista')
    },

    registro: (req, res) => {
        res.render('usuarios/registro');
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);


        if (errors.errors.length > 0) {
            return res.render('usuarios/registro', {
                errors: errors.mapped(),
                oldData: req.body
            });
        }

        let userInDB = users.findByField('email', req.body.email);
        console.log(userInDB)

        if (userInDB) {
            return res.render('usuarios/registro', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            name: req.body.name,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }

        let userCreated = users.create(userToCreate);

        return res.redirect('/usuarios/login')
    },


    login: (req, res) => {
        console.log(req.session)
        res.render('usuarios/login');
    },

    processLogin: (req, res) => {
        let userToLogin = users.findByField('email', req.body.email);

        if (userToLogin) {
            let correctPassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            console.log('Correct Password:', correctPassword);

            if (correctPassword) {
                delete userToLogin.password
                req.session.usuarioLogueado = userToLogin
                return res.redirect('usuarios/profile');
            }
            console.log('Incorrect Password');
            return res.render('usuarios/login', {
                errors: {
                    email: {
                        msg: "Datos incorrectos"
                    }
                }
            });
        }


        return res.render('login', {
            errors: {
                email: {
                    msg: "Email inexistente"
                }
            }
        });
    },



}

module.exports = userController;