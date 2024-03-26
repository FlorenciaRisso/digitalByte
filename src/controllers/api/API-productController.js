const apiProductService = require("../../data/api/API-productService");

let productController = {
  list: async (req, res) => {
    try {
      let products = await apiProductService.getAll();
      const count = products.length;

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
        name: product.nombre,
        description: product.descripcion,
        categories: product.Categoria.nombre,
        detail: `/api/products/${product.ID_Producto}`
      }));

      res.json({
        count: count,
        countByCategory: countByCategory,
        products: productList
      });
    } catch (error) {
      console.log(error.message);
      res.set("Content-type", "text/plain");
      res.status(500).send("Error inesperado");
    }
  },
  detail: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await apiProductService.getOne(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  console.log(product)
      const productDetail = {};

      productDetail.id = product.ID_Producto;
      productDetail.nombre = product.Nombre;
      productDetail.descripcion = product.Descripcion;
      productDetail.precio = product.Precio;
      productDetail.stock = product.Stock;
      productDetail.categoria = product.Categoria;
      productDetail.marca = product.Marca;
      productDetail.descuento = product.Descuento;
      productDetail.usuario = product.Usuario;
      productDetail.ImagenesProducto = product.ImagenesProductos;
      productDetail.ImagenesProducto = product.ImagenesProductos;
  
      
  
      // productDetail.imageURL = `/api/products/${product.id}/image`;
  
      res.json(productDetail);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  }
}

module.exports = productController;
