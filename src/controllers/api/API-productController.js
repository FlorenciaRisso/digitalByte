// En el archivo del controlador (API-productController.js)
const apiProductService = require("../../data/api/API-productService");

let productController = {
  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10; // Cantidad de registros por página
      const offset = (page - 1) * limit; //  Paginación

      let products = await apiProductService.getAllWithPagination(limit, offset);
      let allProducts = await apiProductService.getAll();
      const count = await apiProductService.getCount(); //Cuenta el total de los productos
      let countByCategory = {};

      allProducts.forEach(product => {
        const categoryName = product.Categoria.nombre;
        if (!countByCategory[categoryName] ) {
          countByCategory[categoryName] = 0;
        }
        countByCategory[categoryName]++;
      });

      let result = [];

      Object.keys(countByCategory).forEach(categoryName => {
        // Almacenar el nombre de la categoría y la cantidad de productos asociados en un objeto
        const categoryObject = {
          nombre: categoryName,
          cantidad: countByCategory[categoryName]
        };
        // Agregar el objeto al arreglo result
        result.push(categoryObject);
      });

      let siguienteUrl = null;
      let anteriorUrl = null;

      const totalPages = Math.ceil(count / limit); //Calcula y redondea hacia arriba el numero de paginas

      if (page < totalPages) {
        siguienteUrl = `${page + 1}`;
      }
      if (page > 1) {
        anteriorUrl = `${page - 1}`;
      }

      res.json({
        count: count,
        countByCategory: result,
        products: products,
        next: siguienteUrl,
        previous: anteriorUrl
      });

    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },

  detail: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await apiProductService.getOne(productId);

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      res.json(product);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },
  latest: async (req, res) => {
    try {
      const latestProduct = await apiProductService.getMaxProduct();
      console.log(latestProduct)
      if (!latestProduct) {
        return res.status(404).json({ error: 'No se encontró ningún producto' });
      }
      
      res.json(latestProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },

};

module.exports = productController;
