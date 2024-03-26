const { Usuarios } = require('../../model/database/models');
const fs = require('fs');


const apiUserService = {
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
    }
}
module.exports = apiUserService;