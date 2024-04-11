const db = require('../../model/database/models');
const apiProductService = {

    getAllWithPagination: async function (limit, offset, whereClause = {}) {
        try {
            return await db.Productos.findAll({
                limit: limit,
                offset: offset,
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                where: whereClause
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getCount: async function(whereClause = {}) {
        try {
            const count = await db.Productos.count({
                where: whereClause
            });
            return count;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
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
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getMaxProduct: async () => {
        try {
            const highestProduct = await db.Productos.findOne({
                order: [
                    ['ID_Producto', 'DESC']
                ],
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' },
                    { association: 'Usuario' }
                ]
            });
            return highestProduct;
        } catch (error) {
            throw new Error('Error al obtener el producto con el ID más alto');
        }
    },
    getDiscountedProducts: async (discountPercentage) => {
        try {
            const discountedProducts = await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                where: {
                    descuento: 20
                }
            });
            return discountedProducts;
        } catch (error) {
            console.log(error);
            throw new Error('Error al obtener los productos con descuento');
        }
    }
}
module.exports = apiProductService;