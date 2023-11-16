//Require de express
const express=require('express');

//Ejecucion de express
const app=express(); 

//Require path
const path=require('path');

//Usando recursos estaticos
app.use(express.static('public'));

//Levantando el servidor Puerto 3080
app.listen(3080,()=>console.log("Exito")); 

//RUTAS

app.get('/',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'views/productCart.html')); 
});
