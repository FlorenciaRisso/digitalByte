const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

let userController = {

    login: (req, res) => {
        res.render('usuarios/login');
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        let usuarioALoguearse

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync('users.json', { encoding: 'utf-8' })
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON)
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if (!usuarioALoguearse) {
                return res.render('usuarios/login', {
                    errors: [
                        { msg: 'Credenciales inválidas' }
                    ]
                });
            }
            req.session.usuarioLogueado = usuarioALoguearse;
        } else {
            res.render('usuarios/login', { errors: errors.errors })
        }

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
    }
}

module.exports = userController;