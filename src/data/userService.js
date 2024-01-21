const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const userRouter = path.join(__dirname, '../data/jsonUsuarios.json');
const usuariosArray = JSON.parse(fs.readFileSync(userRouter, 'utf-8'));
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const userService = {

    users: usuariosArray,

    getData: function () {
        return this.users;
    },

    findAll: function () {
        return this.getData()
    },

    getOne: function (userId) {
       
        let user = this.users.find((user) => user.id === userId );
        return user;
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(userRouter, JSON.stringify(this.users, null, " "));
        return newUser;
    },

    save: function (req, res) {
        let errors = [];
        errors = validationResult(req);
        let userInDB = this.findByField('email', req.body.email);

        if (userInDB) {
            errors.errors.push({
                type: 'field',
                value: req.body,
                msg: 'El email ya existe',
                path: 'email',
                location: 'body'
            })
            console.log(errors)
        }



        if (errors.errors.length > 0) {
            return { errors: errors };
        }

        let userToCreate = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            rol: req.body.category,
            country: req.body.country,
            image: '/img/' + req.file.filename
        }

        let userCreated = this.create(userToCreate);

        return {
            success: true,
            userCreated: true
        };
    },

    validarUsuario: function (req) {
        let validarEmail = this.findByField('email', req.body.email);
        let validarContraseña = bcrypt.compareSync(req.body.password, validarEmail.password);


        if (validarEmail && validarContraseña) {
            delete validarEmail.password
            req.session.usuarioLogueado = validarEmail
            return true;
        } else {
            return false;
        }
    },

    generateId: function () {
        let allUsers = this.users;
        let lastUser = allUsers[allUsers.length - 1];
        return lastUser.id + 1;
    },

    delete: function (id) {
        let allUsers = this.users;
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(userRouter, JSON.stringify(finalUsers, null, " "));
        return true;
    }

}
module.exports = userService;