// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

const path = require('path');
const fs = require('fs');
const productsFilePath = path.join(__dirname, '../data/jsonProductos.json');
const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productService = {

    products: productsArray,
    
    getAll: function (req, res) {
        return this.products;
    },
    getOne: function (req, res) {
        let producto = this.products.find((producto) => { return producto.id == req.params.id });
        return producto;
    },
    getProdPorCat: function (req, res) {
        let categoria = req.params.id;
        let productos = this.products.filter((producto) => { return producto.category == req.params.id })
        return productos;
    },
    save: function (req, res) {
        console.log('Creando un producto')
        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8')
        return 'OK'
    },
}

module.exports = productService;