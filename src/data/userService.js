const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../model/database/models');

const userService = {
    getAll: async function () {
        try {
            return await User.findAll();
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            return [];
        }
    },
    getOne: async function (userId) {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
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
            await User.update(updatedUser, { where: { id: userId } });
            return true;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return false;
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