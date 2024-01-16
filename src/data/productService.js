// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

const path = require('path');
const fs = require('fs');
const productRouter = path.join(__dirname, '../data/jsonProductos.json');
const productsArray = JSON.parse(fs.readFileSync(productRouter, 'utf-8'));

const productService = {

    products: productsArray,

    getAll: function (req, res) {
        return this.products;
    },
    getOne: function (req, res) {
        let producto = this.products.find((producto) => { return producto.id == req.params.id });
        return producto;
    },
    getProdPorCat: function (req, res) {
        let productos = this.products.filter((producto) => { return producto.category.name == req.query.cat });
        return productos;
    },
    update: function (req) {
        let categorias = [
            { "id": "1", "name": "Smartphones" },
            { "id": "2", "name": "Tablets" },
            { "id": "3", "name": "Notebooks" }
        ];
        let index = this.products.indexOf(this.getOne(req));
        this.products[index].name = req.body.name || this.products[index].name;
        this.products[index].description = req.body.description || this.products[index].description;
        this.products[index].price = req.body.price || this.products[index].price;
        //busca la categoria con el valor enviado por el campo category, que es el id de la categoria. 
        //Luego asigna el objeto al campo category del producto a editar
        let selectedCategory = categorias.find(cat => cat.id === req.body.category);
        this.products.category = { "id": selectedCategory.id, "name": selectedCategory.name };
        let image = "/img/default-image.png";
        this.products[index].discount = req.body.discount || this.products[index].discount;
        this.products[index].specifications.Tamaño = req.body.Tamanio || this.products[index].specifications.Tamaño;
        this.products[index].specifications.Memoria = req.body.Memoria || this.products[index].specifications.Memoria;
        this.products[index].specifications.Ram = req.body.Ram || this.products[index].specifications.Ram;
        this.products[index].specifications.CamaraPrincipal = req.body.CamaraPrincipal || this.products[index].specifications.CamaraPrincipal;

        // Manejo cuando se han subido archivos
        for (let i = 0; i < 4; i++) {
            const fileField = req.files[`image${i}`];
            if (fileField && fileField.length > 0) {
                this.products[index][`image${i}`] = '/img/' + fileField[0].filename;
            } else {
                if (!this.products[index][`image${i}`]) {
                    this.products[index][`image${i}`]=image;
                }
            }
        }
        fs.writeFileSync(productRouter, JSON.stringify(this.products), 'utf-8')
    },
    delete: function (req) {
        let index = this.products.indexOf(this.getOne(req));
        this.products.splice(index, 1);//splice elimina 1 elemento desde el indice indicado, en este caso el elemento buscado
        fs.writeFileSync(productRouter, JSON.stringify(this.products), 'utf-8');
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
            "CamaraPrincipal": req.body.CamaraPrincipal|| '',
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

        this.products.push(product);
        fs.writeFileSync(productRouter, JSON.stringify(this.products), 'utf-8');
    },
}

module.exports = productService;