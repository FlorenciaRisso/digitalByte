const path = require('path');

let userController = {
    index: (req, res)=>{
        res.send("HOME DE USUARIOS");
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del usuario " + req.params.id);
    }

}

module.exports = userController;