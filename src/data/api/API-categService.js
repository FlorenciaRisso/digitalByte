const db = require('../../model/database/models');
const Sequelize = require('sequelize');
const ApiCategoriaService = {

    getAll: async function () {
        try {
            return await db.Categorias.findAll();
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
module.exports = ApiCategoriaService;