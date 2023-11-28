
const express=require('express');
const app=express(); 
const path=require('path');
const cartHtmlFile = path.join(__dirname, '/views/productCart.html');
app.use(express.static('public'));

app.listen(3030,()=>console.log("Exito")); 

app.get('/',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'views/index.html')); 
});

app.get('/Detalle',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/productDetail.html')); 
});
app.get('/Registro',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/registro.html')); 
});
app.get('/Login',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/login.html')); 
});
app.get('/Carrito', (req, res) => {
  res.sendFile(cartHtmlFile);
});

