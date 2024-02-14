// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

const path = require('path');
const fs = require('fs');
const productRouter = path.join(__dirname, '../data/jsonProductos.json');
const db = require('../model/database/models')
const productsArray = JSON.parse(fs.readFileSync(productRouter, 'utf-8'));


const productService = {

    products: productsArray,

    getAll: async function (req, res) {
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
    save: function (req) {
        let product = {};
        let categorias = [
            { "id": "1", "name": "Smartphones" },
            { "id": "2", "name": "Tablets" },
            { "id": "3", "name": "Notebooks" }
        ];
        let lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        product.id = lastProductId + 1;
        product.name = req.body.name;
        product.description = req.body.description;
        let selectedCategory = categorias.find(cat => cat.id === req.body.category);
        product.category = { "id": selectedCategory.id, "name": selectedCategory.name };
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.plus = "";
        product.marca = req.body.marca;
        let image = "/img/default-image.png";
        let specifications = {
            "Tamaño": req.body.Tamanio || '',
            "Memoria": req.body.Memoria || '',
            "CamaraPrincipal": req.body.CamaraPrincipal || '',
            "Ram": req.body.Ram || ''
        };
        product.specifications = specifications;
        if (!req.files || Object.keys(req.files).length === 0) {
            // Manejo cuando no se han subido archivos
            for (let i = 0; i < 4; i++) {
                if (!product[`image${i}`]) {
                    product[`image${i}`] = image;
                }
            }
        } else {
            // Manejo cuando se han subido archivos
            for (let i = 0; i < 4; i++) {
                const fileField = req.files[`image${i}`];
                if (fileField && fileField.length > 0) {
                    product[`image${i}`] = '/img/' + fileField[0].filename;
                } else {
                    if (!product[`image${i}`]) {
                        product[`image${i}`] = image;
                    }
                }
            }
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