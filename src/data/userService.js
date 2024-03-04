const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../model/database/models');
const fs = require('fs');
const { Productos } = require('../model/database/models')


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
                rol: req.body.rol,
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
    update: async function (req) {
        try {
            let usuario = {
                nombre: req.body.firstName,
                apellido: req.body.lastName,
                nacionalidad: req.body.country,
                rol: req.body.rol
            }
            console.log(usuario);
            if (req.file) {
                usuario.avatar = "/img/" + req.file.filename;
            }
            const [filasActualizadas, [usuarioActualizado]] = await Usuarios.update(usuario, { where: { id: req.params.id } });

            return usuarioActualizado;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return false;
        }
    },
    validarContraseña: async function (req) {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return { errors: errors.mapped() };
            } else {
                let usuario = await Usuarios.findByPk(req.params.id);
                usuario.contraseña = await bcrypt.hash(req.body.contrasenia, 10);
                let user = await usuario.save();
                return { success: true, user: user };
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    delete: async function (userId) {
        try {
            await Productos.destroy({ where: { ID_Vendedor: userId } });

            await Usuarios.destroy({ where: { id: userId } });
            return true;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return false;
        }
    }

}
module.exports = userService;