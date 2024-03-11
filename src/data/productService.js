// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

const fs = require('fs');
const db = require('../model/database/models')


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
    getOne: async function (req) {
        try {
            return await db.Productos.findByPk(req.params.id, {
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ]
            });
        } catch {
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
                ID_Vendedor:req.session.usuarioLogeado.id
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

            console.log("Producto creado:", nuevoProducto.toJSON());
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
    perteneceAMisProductos: async function (req){
        let idUsuario=req.params.id;
        let pertenece= await db.Productos.findByPk(idUsuario,{include:{association:'Usuario'}});
        if(!pertenece){
            return false;
        }else{
            return true;
        }
    },
    update: async function (req) {
        try {
            const productId = req.params.id;

            // Actualizar la información básica del producto
            let productoActualizado = await db.Productos.update(
                {
                    Nombre: req.body.name,
                    Descripcion: req.body.description,
                    Precio: req.body.price,
                    Descuento: req.body.discount,
                    Stock: req.body.stock,
                    ID_Categoria: req.body.category,
                    Marca: req.body.marca,
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
                let idParaNuevaRuta=null;
                let nuevaRuta=null;
                for (let i = 0; i < imagesToUpdate.length; i++) {
                    if (imagesToUpdate[i].ruta != null) {
                        idParaNuevaRuta = ids[i];
                        nuevaRuta = imagesToUpdate[i].ruta;
                    }else{
                        idParaNuevaRuta=null;
                        nuevaRuta=null;
                    }
                    if(idParaNuevaRuta){
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
            let caracteristicas= await db.Caracteristicas.findOne({where: {ID_Producto:productId}});
            if(caracteristicas){
                await db.Caracteristicas.update(
                    {
                        tamaño: req.body.Tamanio,
                        memoria: req.body.Memoria,
                        camara: req.body.CamaraPrincipal,
                        ram: req.body.Ram
                    },
                    { where: { ID_Producto: productId } }
                );
            }else{
                await db.Caracteristicas.create(
                    {
                        tamaño: req.body.Tamanio,
                        memoria: req.body.Memoria,
                        camara: req.body.CamaraPrincipal,
                        ram: req.body.Ram,
                        ID_Producto:productId
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
                console.log('Producto y sus relaciones eliminadas correctamente');
                return { status: 'success', message: 'Product and its relationships deleted successfully' };
            } else {
                console.log('No se encontró el producto para eliminar');
                return { status: 'error', message: 'Product not found or already deleted' };
            }
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            return { status: 'error', message: error.message };
        }
    }
}

module.exports = productService;