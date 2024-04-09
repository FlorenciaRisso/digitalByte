// En el archivo del controlador (API-productController.js)
const apiProductService = require("../../data/api/API-productService");

let productController = {
  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      const allProducts = await apiProductService.getAllWithPagination(limit, offset);
  
      const discountedProducts = await apiProductService.getDiscountedProducts(20);
  
      let countByCategory = {};
      allProducts.forEach(product => {
        const categoryName = product.Categoria.nombre;
        if (!countByCategory[categoryName]) {
          countByCategory[categoryName] = 0;
        }
        countByCategory[categoryName]++;
      });
  
      let siguienteUrl = null;
      let anteriorUrl = null;
      const count = await apiProductService.getCount();
      const totalPages = Math.ceil(count / limit);
  
      if (page < totalPages) {
        siguienteUrl = `${page + 1}`;
      }
      if (page > 1) {
        anteriorUrl = `${page - 1}`;
      }
  
      res.json({
        count: count,
        countByCategory: countByCategory,
        discountedProducts: discountedProducts,
        products: allProducts,
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
      if (!latestProduct) {
        return res.status(404).json({ error: 'No se encontró ningún producto' });
      }
      
      res.json(latestProduct);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },
  discount: async (req, res) => {
    try {
      const discountedProducts = await apiProductService.getDiscountedProducts(20);
  
      if (discountedProducts.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos con descuento del 20%' });
      }

      res.json(discountedProducts);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },

};

module.exports = productController;
