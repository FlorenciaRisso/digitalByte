const productService = require('../data/productService');
const funcion = require('../data/funcion');
const { validationResult } = require('express-validator');

let productController = {
    index: async function (req, res) {
        try {
            let data = await productService.getAll();
            res.render('productos/index', { productos: data, funcion: funcion });
        } catch (error) {
            console.log(error);
        }
    },
    lista: async function (req, res) {
        try {
            let data = await productService.getAll();
            res.render('productos/lista', { productos: data, funcion: funcion });
        } catch {
            console.log(error);
        }
    },
    listado:
        async function (req, res) {
            try {
                let respuesta = await productService.getAll();
                res.json(respuesta);
            } catch (error) {
                console.log(error);
            }
        },
    listaPorUsuario: async function (req, res) {
        try {
            let productos;
            if (req.session.usuarioLogeado.rol == 'Administrador') {
                productos = await productService.getAll();
            } else {
                productos = await productService.getAllByID(req.session.usuarioLogeado.id);
            }
            res.render('productos/lista', { productos: productos, funcion: funcion });
        } catch (error) {
            console.log(error);
        }
    },
    carrito: async function (req, res){
        try{
            let data=await productService.getAll();
            res.render('productos/carrito', { productos: data, funcion: funcion });
        }catch(error){
            console.log(error);
        }
        

    },
    listaPorCat:async function (req, res){
        try{
            let data=await productService.getProdPorCat(req);
            res.render('productos/categoria', { productos: data, funcion: funcion });
        }catch(error){
            console.log(error);
        }
        

    },
    detalle: async (req, res) => {
        let productId = req.params.id;
        let producto = await productService.getOne(productId);
        let productos = await productService.getAll();
        res.render('productos/detalle', { producto: producto, productos: productos, funcion: funcion });
    },
    create: (req, res) => {
        res.render('productos/create', { funcion: funcion })
    },
    save: async (req, res) => {
        try {
            let error = validationResult(req);
            if (error.isEmpty() && req.fileValidationError === undefined) {
                await productService.save(req);
                res.redirect('/productos/listaMisProductos');
            } else {
                res.render('productos/create', { fileValidationError: req.fileValidationError, errors: error.mapped(), funcion: funcion, oldData: req.body })
            }
        } catch (error) {
            console.log(error);
        }

    },
    editProducto: async (req, res) => {
        try {
            let producto = await productService.getOne(req.params.id);
            let pertenece = await productService.perteneceAMisProductos(req);
            if (pertenece) {
                res.render('productos/edit', { oldData: producto, producto: producto, funcion: funcion })
            } else {
                res.status(403).render('error403');
            }
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
            let productoAnterior = await productService.getOne(req.params.id);
            if (error.isEmpty() && req.fileValidationError === undefined) {
                await productService.update(req);
                res.redirect('/productos/listaMisProductos');
            } else {
                res.render('productos/edit', { fileValidationError: req.fileValidationError, errors: error.mapped(), funcion: funcion, oldData: producto, producto: productoAnterior })
            }
        }
        catch (error) {
            console.log(error)
        };


    },
    delete: async function(req, res){
        try{
            let resultado=productService.delete(req);
            if (resultado.status == 'success') {
                res.redirect('/productos/listaMisProductos');
            } else {
                res.redirect('/productos/listaMisProductos');
            }
        }catch(error){
            console.log(error);
        }
    },

    search: async (req, res) => {
        try {
            const name = req.body.busqueda;
            const results = await productService.getByName(name)
            res.render('productos/resultados', { productos: results, funcion: funcion }); // Renderiza una vista con los resultados
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

module.exports = productController;