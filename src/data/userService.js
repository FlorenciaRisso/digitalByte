const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { Usuarios } = require('../model/database/models');


const userService = {
    getAll: async function () {
        try {
            return await Usuarios.findAll({where:{estado:'A'}});
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            return [];
        }
    },
    getBy:async function(clave,valor){
        try{
            return await Usuarios.findOne({ where: {[clave]: valor } })
        }catch(error){
            return[];
        }
    },
    getUsuarios: async function (req) {
        try {
            let usuarios;
            const estado = req.query.estado;
            if (estado === 'activo') {
                usuarios = await Usuarios.findAll({ where: { estado: 'A' } });
            } else if (estado === 'inactivo') {
                usuarios = await Usuarios.findAll({ where: { estado: 'I' } });
            } else {
                usuarios = await Usuarios.findAll();
            }
            return usuarios;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getAllInac: async function () {
        try {
            return await Usuarios.findAll({where:{estado:'I'}});
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
            return await Usuarios.findOne({ where: { [field]: value,estado:'A'} });
        } catch (error) {
            console.error('Error al buscar el usuario por campo:', error);
            return null;
        }
    },
    save: async function (req, res) {
        try {
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            let userCreated = await Usuarios.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                contraseña: hashedPassword,
                rol: req.body.rol,
                nacionalidad: req.body.nacionalidad,
                avatar: '/img/' + (req.file ? req.file.filename : 'avatar.jpg')
            });

            return userCreated;

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
                email:req.body.email,
                rol: req.body.rol,
                direccion:req.body.direccion,
                telefono:req.body.telefono,
                estado:req.body.estado
            }
            if (req.file) {
                usuario.avatar = "/img/" + req.file.filename;
            }else{
                usuario.avatar=req.body.oldImage;
            }
            const usuarioActualizado = await Usuarios.update(usuario, { where: { id: req.params.id } });
            
            return usuarioActualizado[0];
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
            return await Usuarios.update({estado:'I'},{ where: { id: userId } });
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return false;
        }
    },
    activar: async function (userId) {
        try {
            return await Usuarios.update({estado:'A'},{ where: { id: userId } });
        } catch (error) {
            console.error('Error al activar el usuario:', error);
            return false;
        }
    }

}
module.exports = userService;