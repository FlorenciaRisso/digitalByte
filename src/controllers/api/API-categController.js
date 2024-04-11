const apiCategoriaService = require('../../data/api/API-categService');

let categoriaController = {
    lista: async function (req, res) {
        try {
            let data = await apiCategoriaService.getAll();
            let count = await apiCategoriaService.getCount();
            res.json({
                Count: count,
                Categories: data

            });
        } catch (error) {
            console.log(error);
        }
    },
    detail: async function (req, res) {
        try {
            let data = await apiCategoriaService.getBy(req.params.id);
            res.json({
                Categories: data

            });
        } catch (error) {
            console.log(error);
        }
    },
    
}
module.exports = categoriaController;