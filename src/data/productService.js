// 1 SMARTPHONE, 2 TABLET, 3 NOTEBOOK

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
    },

    save: function(product){
        console.log('Creando un producto')
        this.products.push(product);
        fs.writeFileSync(productsFilePath, JSON.stringify(this.products), 'utf-8')
        return 'OK'
    },
    
    listarPorCategoria: function(req, res){
        let productos = this.products.filter((producto) => {
            producto.category === (req.params.id);
            
        });
        return productos;
    }

}
module.exports=productService;