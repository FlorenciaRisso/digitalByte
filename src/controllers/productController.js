const productService = require('../data/productService');
const funcion = require('../data/funcion');
const db = require('../model/database/models');
const Sequelize = require('sequelize');
const { log } = require('console');
const { validationResult } = require('express-validator');

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
    listaPorUsuario: async function (req, res) {
        try {
            let productos;
            if (req.session.usuarioLogeado.rol == 'Administrador') {
                productos = await db.Productos.findAll({
                    include: [{ association: 'Caracteristica' }, { association: 'Categoria' }, { association: 'ImagenesProductos' }]
                });
            } else {
                productos = await db.Productos.findAll({
                    include: [{ association: 'Caracteristica' }, { association: 'Categoria' }, { association: 'ImagenesProductos' }], where: {
                        ID_Vendedor: req.params.id
                    }
                });
            }


            if (!productos) {
                return res.status(403).send("No se encontraron productos")
            } else {
                res.render('productos/lista', { productos: productos, funcion: funcion });
            }
        } catch (error) {
            console.log(error);
        }
    },
    carrito: (req, res) => {
        productService.getAll().
            then(data => res.render('productos/carrito', { productos: data, funcion: funcion })).
            catch(error => console.log(error));

    },
    listaPorCat: (req, res) => {
        productService.getProdPorCat(req).
            then(data => { res.render('productos/categoria', { productos: data, funcion: funcion }) }).
            catch(error => console.log(error));

    },
    detalle: async (req, res) => {
        let producto = await productService.getOne(req);
        let productos = await productService.getAll();
        res.render('productos/detalle', { producto: producto, productos: productos, funcion: funcion });
    },
    create: (req, res) => {
        res.render('productos/create', { funcion: funcion })
    },
    save: async (req, res) => {
        try {
            let error = validationResult(req);
            if (error.isEmpty()) {
                let nuevoProducto = await productService.save(req);
                res.redirect('/productos/listaMisProductos/'+req.session.usuarioLogeado.id);
            } else {
                res.render('productos/create', { errors: error.mapped(), funcion: funcion, oldData: req.body })
            }
        } catch (error) {
            console.log(error);
        }

    },
    editProducto: async (req, res) => {
        try {
            let producto = await productService.getOne(req);
            console.log(producto.ID_Producto);
            res.render('productos/edit', { oldData: producto, producto: producto, funcion: funcion })
        } catch (error) {
            console.log(error);
        }

    },
    update: async (req, res) => {
        try {
            let error = validationResult(req);
            let producto = req.body;
            producto.ID_Categoria = req.body.category;
            producto.Marca = req.body.marca;
            let productoAnterior = await productService.getOne(req);
            if (error.isEmpty()) {
                let pertenece = await productService.perteneceAMisProductos(req);
                if (pertenece) {
                    await productService.update(req);
                    res.redirect('/productos/listaMisProductos/' + req.session.usuarioLogeado.id);
                } else {
                    res.send(403).send({ mensaje: 'No tienes permiso para editar este producto' });
                }
            } else {
                res.render('productos/edit', { errors: error.mapped(), funcion: funcion, oldData: producto, producto: productoAnterior })
            }
        }
        catch (error) {
            console.log(error)
        };


    },
    delete: (req, res) => {
        productService.delete(req).then(resultado => {
            if (resultado.status == 'success') {
                res.redirect('/productos/lista');
            } else {
                res.redirect('/productos/lista');
            }
        })

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