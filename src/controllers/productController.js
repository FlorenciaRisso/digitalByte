const path = require('path');

let productController = {
    index: (req, res)=>{
        res.render('index')
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del producto " + req.params.id);
    },

    carrito: (req,res) => {
        res.render('products/productCart')
    },
    detalle:(req,res) => {
        res.render('products/productDetail')
    },
    altaProducto:(req,res) => {
        res.render('products/altaProducto')
    },
    editProducto:(req,res) => {
        res.render('products/editProducto')
    },
    listarProductos:(req,res) => {
        const productos = [
            {
              name: 'Ipad 8va Generacion',
              description: 'El nuevo iPad se transforma en lo que quieras: un cuaderno digital, una oficina móvil, un estudio fotográfico, una consola de juegos o una sala de cine.',
              image: '/img/apple/ipadGen8/ipad8va.png',
              category: 'Tablets',
              colors: ['Plata', 'Negro'],
              price: 532.580
            },
            {
              name: 'Ipad 9na Generacion',
              description: 'Diseñado para que hagas todo lo que te gusta, por menos de lo que imaginas.',
              image: '/img/apple/ipadGen9/ipad9na.png',
              category: 'Tablets',
              colors: ['Negro', 'Blanco'],
              price: 649.999
            },
            {
              name: 'Ipad 10ma Generacion',
              description: 'Capturá todos tus momentos al instante gracias a sus cámaras, con resoluciones de 12 Mpx y 12 Mpx, podrás hacer videollamadas o sacarte fotos en cualquier momento y lugar, con una excelente calidad de imagen. Nitidez, brillo y colores vibrantes harán que tus experiencias se reflejen de manera óptima.',
              image: '/img/apple/ipadGen10/ipad10ma.png',
              category: 'Tablets',
              colors: ['Azul', 'Gris', 'Negro'],
              price: 765.809
            }
          ];
        res.render('products/listarProductos',{productos:productos})
    }
}

module.exports = productController;