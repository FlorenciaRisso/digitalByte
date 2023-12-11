const path = require('path');
const fs=requise('fs');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let productService={
    getOneProduct:function(req,res){
        let id=parseInt(req.params.id);
        let producto=this.products

    }

}