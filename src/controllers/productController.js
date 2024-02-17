const path = require('path');
const productService = require('../data/productService');
const funcion = require('../data/funcion');
const db = require('../model/database/models');
const { error } = require('console');

let productController = {
    index: function (req, res) {
        productService.getAll().
            then(data => { res.render('productos/index', { productos: data, funcion: funcion }) }).
            catch(error => { console.log(error) })
    },
    lista: async function (req, res) {
        productService.getAll().
            then(data => { res.render('productos/lista', { productos: data, funcion: funcion }) }).
            catch(error => { console.log(error) })
    },
    listado:
        async function (req, res) {
            try {
                let respuesta = await db.Productos.findAll({ include: [{ association: 'Caracteristica' }, { association: 'Categoria' }, { association: 'ImagenesProductos' }] });
                res.json(respuesta)
            } catch (error) {
                console.log(error);
            }
        },
    carrito: (req, res) => {
        let productos = productService.products;
        res.render('productos/productCart', { productos: productos, funcion: funcion });
    },
    listaPorCat: (req, res) => {
        productService.getProdPorCat(req).
            then(data => { res.render('productos/categoria', { productos: data, funcion: funcion }) }).
            catch(error => console.log(error));

    },
    detalle: async (req, res) => {
        let producto = await productService.getOne(req);
        let productos = await productService.getAll();
        res.render('productos/productDetail', { producto: producto, productos: productos, funcion: funcion });
    },
    create: (req, res) => {
        res.render('productos/create', { funcion: funcion })
    },
    save: (req, res) => {
        productService.save(req).then(data=>res.redirect('/productos')).catch(error=>console.log(error))
    },
    editProducto: (req, res) => {
        productService.getOne(req).then(data=>res.render('productos/editProducto', { producto: data, funcion: funcion })).catch(error=>console.log(error))
        
    },
    update: (req, res) => {
        productService.update(req);
        res.redirect('/productos');
    },
    eliminarProducto: (req, res) => {
        productService.delete(req);
        res.redirect('/productos/listar');
    },

    search: async (req, res) => {
        try {
            const productos = await db.Productos.findAll();
            res.render('headerYNav', { productos });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },

    search: async (req, res) => {
        try {
            const searchTerm = req.query.q;
            const results = await Product.findAll({
                where: {
                    name: {
                        [Sequelize.Op.like]: `%${searchTerm}%`
                    }
                }
            });
            res.render('search_results', { results }); // Renderiza una vista con los resultados
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = productController;