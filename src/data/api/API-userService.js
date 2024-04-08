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
    getAllWithPagination: async function (limit,offset) {
        try {
            return await Usuarios.findAll({
                limit: limit,
                offset: offset
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getCount:async () => {
        try {
          const count = await Usuarios.count();
          return count;
        } catch (error) {
          return[];
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