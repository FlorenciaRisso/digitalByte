// En el archivo del controlador (API-productController.js)
const apiProductService = require("../../data/api/API-productService");

let productController = {
  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      let products = await apiProductService.getAllWithPagination(limit, offset);
      const count = await apiProductService.getCount();
      let countByCategory = {};

      products.forEach(product => {
        const categoryName = product.Categoria.nombre;
        if (!countByCategory[categoryName]) {
          countByCategory[categoryName] = 0;
        }
        countByCategory[categoryName]++;
      });

      let productList = products.map(product => ({
        id: product.ID_Producto,
        name: product.Nombre,
        description: product.Descripcion,
        categories: product.Categoria.nombre,
        detail: `/api/products/${product.ID_Producto}`,
        imagen: product.ImagenesProductos[0],
        price: product.Precio
      }));

      let nextUrl = null;
      let prevUrl = null;
      const totalPages = Math.ceil(count / limit);
      if (page < totalPages) {
        nextUrl = `/api/products/?page=${page + 1}`;
      }
      if (page > 1) {
        prevUrl = `/api/products/?page=${page - 1}`;
      }

      res.json({
        count: count,
        countByCategory: countByCategory,
        products: productList,
        next: nextUrl,
        previous: prevUrl
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
  }
};

module.exports = productController;
