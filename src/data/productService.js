// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

const path = require('path');
const fs = require('fs');
const productRouter = path.join(__dirname, '../data/jsonProductos.json');
const db = require('../model/database/models')
const productsArray = JSON.parse(fs.readFileSync(productRouter, 'utf-8'));


const productService = {

    getAll: async function () {
        try {
            return await db.Productos.findAll({include:[
                {association:'Caracteristica'},
            {association:'ImagenesProductos'},
            {association:'Categoria'}
        ]});
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    getOne:async function (req){
        try{
            return await db.Productos.findByPk(req.params.id,{include:[
                {association:'Caracteristica'},
            {association:'ImagenesProductos'},
            {association:'Categoria'}
        ]});
        } catch{
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
                Stock:req.body.stock,
                Descuento: req.body.discount,
                Marca: req.body.marca
                // ID_Vendedor:req.body.id  AGREGAR ID DEL VENDEDOR OBTENIENDO EN LA TABLA usUaRIos
            });
    
            // Agregar las imágenes del producto
            for (let i = 0; i < 4; i++) {
                const fileField = req.files[`image${i}`];
                const imagePath = fileField ? '/img/' + fileField[0].filename : "/img/default-image.png";
                await db.ImagenesProductos.create({ ID_Producto: nuevoProducto.ID_Producto, ruta: imagePath });
            }
    
            // Agregar las características del producto
            // Suponiendo que tienes una variable `caracteristicas` con las características del producto
            await db.Caracteristicas.create({ ID_Producto: nuevoProducto.ID_Producto, 
                tamaño:req.body.tamanio,
                memoria:req.body.memoria,
                camara:req.body.camara,
                ram:req.body.ram });
    
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
            const productos = await db.Productos.findAll({include:[
                {association:'Categoria'},
            {association:'ImagenesProductos'}],
                where: { ID_Categoria: req.query.cat }});
    
            if (!productos) {
                return []; 
            }
    
            return productos;
        } catch (error) {
            console.log(error);
            return []; // Manejo de errores, retorna un array vacío en caso de error
        }
    }
}

module.exports = productService;