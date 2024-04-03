const apiCategoriaService = require('../../data/api/API-categService');

let categoriaController = {
    lista: async function (req, res) {
        try {
            let data = await apiCategoriaService.getAll();
            console.log(data);
            res.json(data);
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = categoriaController;