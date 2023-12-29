const path = require('path');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../data/jsonUsuarios.json');
const usersArray = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let userService = {

    users: usersArray,

    getAll: function (req, res) {
        return this.users;
    },
    getOne:function(req,res){
        let usuario = this.users.find((usuario) => { return usuario.id == req.params.id });
        return usuario;
    },
    save:function(req,res){
        let usuario={};
        let lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : 0;
        usuario.id=lastUserId + 1;
        usuario.firstName=req.body.nombre;
        usuario.lastName=req.body.apellido;
        usuario.email=req.body.correo;
        usuario.password=req.body.contrasenia;
        let confirmContra=req.body.confirmContra;
        usuario.rol=req.body.category;
        image='/img/perfiles/perfil-default.png';
        if(req.file){
            imagen='/img/perfiles/'+req.file.filename;
        }
        usuario.avatar=imagen;
        usuario.birthDate=req.body.fechaNac;
    }
}
module.exports=userService;