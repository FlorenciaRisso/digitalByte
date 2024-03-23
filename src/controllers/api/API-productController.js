const productService = require("../../data/productService");

let productController = {
  list: async function (req, res) {
    try {
      let products = await productService.getAll();
      res.json(products);
    } catch (error) {
        console.log(error.message)
        res.set('Content-type', 'text/plain')
        res.status(500).send('Error inesperado')
    }
  },
};

module.exports = productController;