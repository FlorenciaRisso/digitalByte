const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../model/database/models');

const userService = {
    getAll: async function () {
        try {
            return await Usuarios.findAll();
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            return [];
        }
    },
    getOne: async function (userId) {
        try {
            return await Usuarios.findByPk(userId);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    },
    findByField: async function (field, value) {
        try {
            return await Usuarios.findOne({ where: { [field]: value } });
        } catch (error) {
            console.error('Error al buscar el usuario por campo:', error);
            return null;
        }
    },
    save: async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return { errors: errors.array() };
            }

            let userInDB = await db.Usuarios.findOne({ where: { email: req.body.email } });
            if (userInDB) {
                return {
                    errors: [{
                        type: 'field',
                        value: req.body,
                        msg: 'El email ya existe',
                        param: 'email',
                        location: 'body'
                    }]
                };
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            let userCreated = await db.Usuarios.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                contraseña: hashedPassword,
                rol: req.body.category,
                nacionalidad: req.body.nacionalidad,
                avatar: '/img/' + (req.file ? req.file.filename : 'default-image.png')
            });

            return {
                success: true,
                userCreated: userCreated
            };
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
            return {
                errors: [{
                    msg: 'Hubo un error al guardar el usuario'
                }]
            };
        }
    },
    update: async function (updatedUser) {
        try {
            const userId = updatedUser.id;
            await Usuarios.update(updatedUser, { where: { id: userId } });
            return true;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return false;
        }
    },
    validarContraseña: async function (req) {
        try{
        let usuario = await Usuarios.findByPk(req.params.id);
        if (usuario) {
            if (bcrypt.compareSync(req.body.contraseñaVieja, usuario.Contraseña)) {
                if (req.body.contraseña === req.body.confirmContraseña) {
                    usuario.Contraseña = bcrypt.hashSync(req.body.contraseña, 10)
                    return usuario.save();
                }
            }

        }} catch (error) {
            return {
                errors: [{
                    type: 'field',
                    value: req.body,
                    msg: 'El email ya existe',
                    param: 'email',
                    location: 'body'
                }]
            }
        }
        

    },

    delete: async function (id) {
        try {
            await User.destroy({ where: { id: id } });
            return true;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return false;
        }
    }

}
module.exports = userService;