//Require de express
const express=require('express');

//Ejecucion de express
const app=express(); 

//Require path
const path=require('path');

//Usando recursos estaticos
app.use(express.static('public'));

//Levantando el servidor Puerto 3080
app.listen(3030,()=>console.log("Exito")); 

//RUTAS
app.get('/',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'views/index.html')); 
});

app.get('/Carrito',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'views/productCart.html')); 
});
app.get('/Detalle',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/productDetail.html')); 
});
app.get('/Registro',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/register.html')); 
});
app.get('/Login',(req,res)=>{ 
    res.sendFile(path.join(__dirname,'views/login.html')); 
});

