const db = require('../model/database/models');
const Sequelize = require('sequelize');
const productService = {

    getAll: async function () {
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ], where: { Estado: 'A' }
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getBy:async function(whereClausule={}){
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ], where: whereClausule
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getAllDescByID:async function(){
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ], where: { Estado: 'A' },order: [['ID_Producto', 'DESC']]
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getProductos: async function (req) {
        try {
            let productos = [];
            const estado = req.query.estado;
            if (estado === 'activo') {
                productos = await db.Productos.findAll({
                    include: [
                        { association: 'Caracteristica' },
                        { association: 'ImagenesProductos' },
                        { association: 'Categoria' }
                    ], where: { Estado: 'A' }
                });
            } else if (estado === 'inactivo') {
                productos = await db.Productos.findAll({
                    include: [
                        { association: 'Caracteristica' },
                        { association: 'ImagenesProductos' },
                        { association: 'Categoria' }
                    ], where: { Estado: 'I' }
                });
            } else {
                productos = await db.Productos.findAll({
                    include: [
                        { association: 'Caracteristica' },
                        { association: 'ImagenesProductos' },
                        { association: 'Categoria' }
                    ]
                });
            }
            return productos;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getAllByID: async function (id) {
        try {
            return await db.Productos.findAll({
                include: [{ association: 'Caracteristica' }, { association: 'Categoria' }, { association: 'ImagenesProductos' }], where: {
                    ID_Vendedor: id,
                    Estado: 'A'
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }

    },
    getMarcas: async function () {
        try {
            const marcas = await db.Productos.findAll({
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('Marca')), 'marca']
                ], raw: true
            });
            const nombresMarcas = marcas.map(marca => marca.marca);
            return nombresMarcas;
        } catch (error) {
            console.log(error);
        }
    },
    getCategorias: async function () {
        try {
            const categorias = await db.Categorias.findAll({
                raw: true
            });
            return categorias;
        } catch (error) {
            console.log(error);
        }
    },
    getBySearch: async function (search) {
        try {
            let resultado = [];
            resultado = await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                where: {
                    [Sequelize.Op.or]: [
                        { Nombre: { [Sequelize.Op.like]: `%${search}%` } },
                        { Marca: { [Sequelize.Op.like]: `%${search}%` } }
                    ],
                    Estado: 'A'
                }
            });
            return resultado;
        } catch (error) {

        }
    },
    getLastSmartphoneByMarca: async function (marca) {
        try {
            const productos = await db.Productos.findAll({
                attributes: ['ID_Producto', 'Nombre', 'Marca'],
                include: [
                    { association: 'Categoria' }
                ],
                where: {
                    Marca: {
                        [Sequelize.Op.like]: `%${marca}%`
                    },
                    ID_Categoria: 2,
                    Estado: 'A'
                },
                order: [['ID_Producto', 'DESC']],
                limit: 3
            });
            return productos;
        } catch (error) {

            console.error(error);
            throw error;
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
    save: async function (req) {
        try {
            const nuevoProducto = await db.Productos.create({
                Nombre: req.body.name,
                Descripcion: req.body.description,
                ID_Categoria: req.body.category,
                Precio: req.body.price,
                Stock: req.body.stock,
                Descuento: req.body.discount,
                Marca: req.body.marca,
                ID_Vendedor: req.session.usuarioLog.id
            });

            // Agregar las imágenes del producto
            for (let i = 0; i < 4; i++) {
                const fileField = req.files[`image${i}`];
                const imagePath = fileField ? '/img/' + fileField[0].filename : "/img/default-image.png";
                await db.ImagenesProductos.create({ ID_Producto: nuevoProducto.ID_Producto, ruta: imagePath });
            }

            // Agregar las características del producto
            await db.Caracteristicas.create({
                ID_Producto: nuevoProducto.ID_Producto,
                tamaño: req.body.Tamanio,
                memoria: req.body.Memoria,
                camara: req.body.CamaraPrincipal,
                ram: req.body.Ram
            });

            return nuevoProducto;
        } catch (error) {
            console.error("Error al guardar el producto:", error);
            throw error;
        }

    },
    //1.notebook,2.smartphone,3.tablet
    getProdPorCat: async function (categoria,limit,offset) {
        try {
            const productos = await db.Productos.findAll({
                limit: limit,
                offset: offset,
                include: [
                    { association: 'Categoria' },
                    { association: 'ImagenesProductos' }
                ],
                where: { ID_Categoria: categoria, Estado: 'A' }
            });

            if (!productos) {
                return [];
            }

            return productos;
        } catch (error) {
            console.log(error);
            return []; 
        }
    },
    getCountPorCat:async function(cat){
            try {
              const count = await db.Productos.count({where: { ID_Categoria: cat, Estado: 'A' }});
              return count;
            } catch (error) {
              return[];
            }
    },
    perteneceAMisProductos: async function (req) {
        let idProducto = req.params.id;
        let producto = await db.Productos.findOne({
            where: {
                ID_Producto: idProducto,
                ID_Vendedor: req.session.usuarioLog.id
            }
        }, { include: { association: 'Usuario' } });
        return !(producto == undefined)
    },
    update: async function (req) {
        try {
            const productId = req.params.id;

            // Actualizar la información básica del producto
            let producto = await db.Productos.update(
                {
                    Nombre: req.body.name,
                    Descripcion: req.body.description,
                    Precio: req.body.price,
                    Descuento: req.body.discount,
                    Stock: req.body.stock,
                    ID_Categoria: req.body.category,
                    Marca: req.body.marca,
                    ID_Vendedor: req.session.usuarioLog.id,
                    Estado: req.body.estado || 'A'
                },
                { where: { ID_Producto: productId } }
            );
            // Actualizar las imágenes del producto

            const imagesToUpdate = [];
            let productImages = await db.ImagenesProductos.findAll({
                attributes: ['id'],
                where: { ID_Producto: productId }
            });
            let ids = productImages.map(image => image.id);
            for (let i = 0; i < 4; i++) {
                const imageKey = `image${i}`;
                if (req.files[imageKey]) {
                    const file = req.files[imageKey][0];
                    imagesToUpdate.push({
                        id: i,
                        ID_Producto: productId,
                        ruta: '/img/' + file.filename
                    });
                } else {
                    imagesToUpdate.push({
                        id: i,
                        ID_Producto: productId,
                        ruta: null
                    });
                }
            }
            if (imagesToUpdate.length > 0) {
                let idParaNuevaRuta = null;
                let nuevaRuta = null;
                for (let i = 0; i < imagesToUpdate.length; i++) {
                    if (imagesToUpdate[i].ruta != null) {
                        let nuevosDatosImagen = {
                            ruta: imagesToUpdate[i].ruta
                        }
                        await db.ImagenesProductos.update(nuevosDatosImagen, {
                            where: { id: ids[i] }
                        });
                    }
                }
            }
            // Actualizar las características del producto
            let caracteristicas = await db.Caracteristicas.findOne({ where: { ID_Producto: productId } });
            if (caracteristicas) {
                await db.Caracteristicas.update(
                    {
                        tamaño: req.body.Tamanio,
                        memoria: req.body.Memoria,
                        camara: req.body.CamaraPrincipal,
                        ram: req.body.Ram
                    },
                    { where: { ID_Producto: productId } }
                );
            } else {
                await db.Caracteristicas.create(
                    {
                        tamaño: req.body.Tamanio,
                        memoria: req.body.Memoria,
                        camara: req.body.CamaraPrincipal,
                        ram: req.body.Ram,
                        ID_Producto: productId
                    }
                );
            }
            return { status: success, message: 'Producto actualizado exitosamente' };
        } catch (error) {
            return { error: error.message };
        }
    },
    //Estado = 'A'  -> activo / Estado = 'I' -> Inactivo / Eliminado
    delete: async function (req) {
        try {
            const productId = req.params.id;
            const deletedProduct = await db.Productos.update({ Estado: 'I' }, { where: { ID_Producto: productId } });

            if (deletedProduct === 1) {
                return { status: 'success', message: 'Producto y sus relaciones eliminadas exitosamente' };
            } else {
                return { status: 'error', message: 'Producto no encontrado o eliminado' };
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return { status: 'error', message: error.message };
        }
    }
}

module.exports = productService;