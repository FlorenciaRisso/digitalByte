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
            return await db.Productos.findAll({include:[{association:'Caracteristica'}]});
        } catch (error) {
            console.log(error);
            return [];
        }
    }

}

module.exports = productService;