const path = require('path');
const productService = require('../data/productService');
const funcion = require('../data/funcion');
const db = require('../model/database/models');
const { error } = require('console');
const Sequelize = require('sequelize')

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
        productService.getAll().
        then(data=>res.render('productos/productCart', { productos: data, funcion: funcion })).
        catch(error=>console.log(error));
        
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
        productService.save(req).then(data => res.redirect('/productos')).catch(error => console.log(error))
    },
    editProducto: (req, res) => {
        productService.getOne(req).then(data => res.render('productos/editProducto', { producto: data, funcion: funcion })).catch(error => console.log(error))

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
            const searchTerm = req.body.busqueda;
            const results = await db.Productos.findAll({
                include: [
                    { association: 'Caracteristica' },
                    { association: 'ImagenesProductos' },
                    { association: 'Categoria' }
                ],
                where: {
                    Nombre: {
                        [Sequelize.Op.like]: `%${searchTerm}%`
                    }
                }
            });
            res.render('productos/resultados', { productos: results, funcion: funcion }); // Renderiza una vista con los resultados
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = productController;