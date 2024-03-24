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
                ]
            });
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getAllByID: async function (id) {
        try {
            return await db.Productos.findAll({
                include: [{ association: 'Caracteristica' }, { association: 'Categoria' }, { association: 'ImagenesProductos' }], where: {
                    ID_Vendedor: id
                }
            });
        } catch (error) {
            console.log(error);
            return [];
        }

    },
    getByName: async function (name) {
        try {
            return await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                where: {
                    Nombre: {
                        [Sequelize.Op.like]: `%${name}%`
                    }
                }
            });
        } catch (error) {

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
    },
    save: async function (req) {
        try {
            const nuevoProducto = await db.Productos.create({
                nombre: req.body.name,
                descripcion: req.body.description,
                ID_Categoria: req.body.category,
                precio: req.body.price,
                stock: req.body.stock,
                descuento: req.body.discount,
                marca: req.body.marca,
                ID_Vendedor: req.session.usuarioLogeado.id
            });

            // Agregar las imágenes del producto
            for (let i = 0; i < 4; i++) {
                const fileField = req.files[`image${i}`];
                const imagePath = fileField ? '/img/' + fileField[0].filename : "/img/default-image.png";
                await db.ImagenesProductos.create({ ID_Producto: nuevoProducto.ID_Producto, ruta: imagePath });
            }

            // Agregar las características del producto
            // Suponiendo que tienes una variable `caracteristicas` con las características del producto
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
    getProdPorCat: async function (req, res) {
        try {
            const productos = await db.Productos.findAll({
                include: [
                    { association: 'Categoria' },
                    { association: 'ImagenesProductos' }
                ],
                where: { ID_Categoria: req.query.cat }
            });

            if (!productos) {
                return [];
            }

            return productos;
        } catch (error) {
            console.log(error);
            return []; // Manejo de errores, retorna un array vacío en caso de error
        }
    },
    perteneceAMisProductos: async function (req) {
        let idUsuario = req.params.id;
        let producto = await db.Productos.findByPk(idUsuario, { include: { association: 'Usuario' } });
        return !(producto == undefined)
    },
    update: async function (req) {
        try {
            const productId = req.params.id;

            // Actualizar la información básica del producto
            await db.Productos.update(
                {
                    nombre: req.body.name,
                    descripcion: req.body.description,
                    precio: req.body.price,
                    descuento: req.body.discount,
                    stock: req.body.stock,
                    ID_Categoria: req.body.category,
                    marca: req.body.marca,
                    ID_Vendedor: req.session.usuarioLogeado.id
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
                        idParaNuevaRuta = ids[i];
                        nuevaRuta = imagesToUpdate[i].ruta;
                    } else {
                        idParaNuevaRuta = null;
                        nuevaRuta = null;
                    }
                    if (idParaNuevaRuta) {
                        let nuevosDatosImagen = {
                            ruta: nuevaRuta
                        }
                        await db.ImagenesProductos.update(nuevosDatosImagen, {
                            where: { id: idParaNuevaRuta }
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

    delete: async function (req) {
        try {
            const productId = req.params.id;

            // Eliminar las características del producto
            await db.Caracteristicas.destroy({ where: { ID_Producto: productId } });

            // Eliminar las imágenes del producto
            await db.ImagenesProductos.destroy({ where: { ID_Producto: productId } });

            // Eliminar el producto de la base de datos
            const deletedProduct = await db.Productos.destroy({ where: { ID_Producto: productId } });

            if (deletedProduct === 1) {
                return { status: 'success', message: 'Product and its relationships deleted successfully' };
            } else {
                return { status: 'error', message: 'Product not found or already deleted' };
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return { status: 'error', message: error.message };
        }
    }
}

module.exports = productService;