const db = require('../../model/database/models');
const ApiCategoriaService = {

    getAll: async function () {
        try {
            const categorias = await db.Categorias.findAll({
                include: [{association:'Productos'}],
                atrributes:['ID_Producto','Nombre']
            });

            categorias.forEach(categoria => {
                categoria.dataValues.numProductos = categoria.Productos.length;
            });
            return categorias;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getCount: async () => {
        try {
            const count = await db.Categorias.count();
            return count;
        } catch (error) {
            return [];
        }
    },
    getBy: async function (id) {
        try {
            const categorias = await db.Categorias.findAll({
                include: [{association:'Productos',include:[{association:'ImagenesProductos'}]},],where:{id:id}
            });

            categorias.forEach(categoria => {
                categoria.dataValues.numProductos = categoria.Productos.length;
            });
            return categorias;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
}
module.exports = ApiCategoriaService;