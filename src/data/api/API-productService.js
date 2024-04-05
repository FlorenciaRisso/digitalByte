const db = require('../../model/database/models');
const Sequelize = require('sequelize');
const apiProductService = {

    getAllWithPagination: async function (limit,offset) {
        try {
            return await db.Productos.findAll({
                limit: limit,
                offset: offset,
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
    getCount:async () => {
        try {
          const count = await db.Productos.count();
          return count;
        } catch (error) {
          return[];
        }
    },
    getAll: async function (limit) {
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                limit: limit,
                offset: 10
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
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}
module.exports = apiProductService;