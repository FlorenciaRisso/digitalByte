const path = require('path');
const fs=require('fs');
const productsFilePath = path.join(__dirname, '../data/jsonProductos.json');
const productsArray = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productService={
    products:productsArray,
    getAll:function(req,res){
        return this.products;
    },
    getOne:function(req,res){
        let id=parseInt(req.params.id);
        let producto=this.products.find((producto)=>{producto.id==id});
        return producto;
    }

}
module.exports=productService;