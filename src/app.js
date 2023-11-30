//Require de express
const express=require('express');

//Ejecucion de express
const app=express(); 

//Require path
const path=require('path');

const indexRouter = require('./routes/index.routes');
const productRouter = require('./routes/productos.routes');
const userRouter = require('./routes/usuarios.routes');

const cartHtmlFile = path.join(__dirname, '/views/productCart.html');

//Usando recursos estaticos
app.use(express.static('public'));

//Levantando el servidor Puerto 3080
app.listen(3030,()=>console.log("Exito")); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//RUTAS

app.use('/', (req, res)=>{
    res.render('indexCart')
});

app.use('/productos', productRouter);
app.use('/usuarios', userRouter);

/*app.get('/',(req,res)=>{ 
    res.sendFile(path.resolve(__dirname,'views/index.html')); 
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
app.get('/Carrito', (req, res) => {
  res.sendFile(cartHtmlFile);
});*/

