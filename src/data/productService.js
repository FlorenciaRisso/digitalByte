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
        let productos = this.products.filter((producto) => { return producto.category == req.query.cat });
        console.log(productos);
        return productos;
    },
    update: function (req) {
        let index = this.products.indexOf(this.getOne(req.params.id));
        this.products[index].name = req.body.name || this.products[index].name;
        this.products[index].description = req.body.description || this.products[index].description;
        this.products[index].price = req.body.price || this.products[index].price;
        this.products[index].category = req.body.category || this.products[index].category;
        this.products[index].discount = req.body.discount || this.products[index].discount;
        this.product[index].specifications.Tamanio=req.body.Tamanio || this.product[index].specifications.Tamanio;
        this.product[index].specifications.Memoria=req.body.Memoria || this.product[index].specifications.Memoria;
        this.product[index].specifications.Ram=req.body.Ram || this.product[index].specifications.Ram;
        this.product[index].specifications.CamaraPrincipal=req.body.CamaraPrincipal || this.product[index].specifications.CamaraPrincipal;
       
        if (req.file) {
            this.products[index].image0 = '/img/'+fileField[0].filename || this.products[index].image0;
            this.products[index].image1 = '/img/'+fileField[1].filename || this.products[index].image1;
            this.products[index].image2 = '/img/'+fileField[2].filename || this.products[index].image2;
            this.products[index].image3 = '/img/'+fileField[3].filename || this.products[index].image3;
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8')
    },
    delete: function (req) {
        let index = this.products.indexOf(this.getOne(req));
        this.products.splice(index, 1);//splice elimina 1 elemento desde el indice indicado, en este caso el elemento buscado
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
    },
    save: function (req) {
        let product = {};
        let lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        product.id = lastProductId + 1;
        product.name = req.body.name;
        product.description = req.body.description;
        product.category = req.body.category;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.plus = "";
        product.marca = req.body.marca;
        let image = "/img/default-image.png";
        let specifications = {
            "Tamaño": req.body.Tamanio+'"' || '',
            "Memoria": req.body.Memoria + 'GB' || '',
            "CamaraPrincipal": req.body.CamaraPrincipal + 'Mpx' || '',
            "Ram": req.body.Ram + 'GB' || ''
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
                    product[`image${i}`] = '/img/'+fileField[0].filename;
                } else {
                    if (!product[`image${i}`]) {
                        product[`image${i}`] = image;
                    }
                }
            }
        }
        
        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8');
    },
}

module.exports = productService;