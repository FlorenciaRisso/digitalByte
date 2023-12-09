const path = require('path');

let userController = {

    login: (req, res)=>{
        res.render('users/login');
    }, 
    registro: (req, res)=>{
        res.render('users/registro');
    }, 

    getOne: (req, res) => {
        res.send("Estas en la pagina del usuario " + req.params.id);
    }

}

module.exports = userController;