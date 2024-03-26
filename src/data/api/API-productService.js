const db = require('../../model/database/models');
const Sequelize = require('sequelize');
const apiProductService = {

    getAll: async function () {
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ]
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getOne: async function (productId) {
        try {
            return await db.Productos.findByPk(productId, {
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' },
                    { association: 'Usuario' }
                ]
            });
        } catch (error){
            console.log(error);
            return [];
        }
    }
}
module.exports = apiProductService;