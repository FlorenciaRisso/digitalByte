const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../model/database/models');
const fs = require('fs');


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
                if (req.file) { // Si hay una sola imagen
                    if (req.file.path) {
                        fs.unlink(req.file.path, err => {
                            if (err) {
                                console.error("Error al eliminar la imagen:", err);
                            }
                        });
                    }
                } else if (req.files) { // Si hay múltiples imágenes
                    Object.values(req.files).forEach(files => {
                        if (Array.isArray(files)) {
                            files.forEach(file => {
                                if (file && file.path) {
                                    fs.unlink(file.path, err => {
                                        if (err) {
                                            console.error("Error al eliminar la imagen:", err);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
                return { errors: errors.mapped() };
            }



            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            let userCreated = await Usuarios.create({
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
        try {
            let usuario = await Usuarios.findByPk(req.params.id);
            if (usuario) {
                if (bcrypt.compareSync(req.body.contraseñaVieja, usuario.Contraseña)) {
                    if (req.body.contraseña === req.body.confirmContraseña) {
                        usuario.Contraseña = bcrypt.hashSync(req.body.contraseña, 10)
                        return usuario.save();
                    }
                }

            }
        } catch (error) {
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