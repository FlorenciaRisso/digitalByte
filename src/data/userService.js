const { json } = require('body-parser');
const fs = require('fs');
const path = require('path');
const userRouter = path.join(__dirname, '../data/jsonUsuarios.json');
const usuarios = JSON.parse(fs.readFileSync(userRouter,'utf-8'));

const users = {
    allUser: usuarios,

    getData: function(){
        return this.allUser;
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        newUser={
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(userRouter, JSON.stringify(this.allUser, null, " "));
        return newUser;
    },

    generateId: function(){
        let allUsers = this.allUser;
        let lastUser = allUsers[allUsers.length - 1];
        return lastUser.id + 1;
    },

    delete: function(id){
        let allUsers = this.allUser;
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.allUser, JSON.stringify(finalUsers, null, " "));
        return true
    }

}
module.exports = users;