//Require de express
const express=require('express');

//Ejecucion de express
const app=express(); 

//Require path
const path=require('path');

//define method 
const methodOverride =  require('method-override');

const indexRouter = require('./routes/index.routes');

//Usando recursos estaticos
app.use(express.static('public'));
//Override
app.use(methodOverride('_method'));
//config utf-8
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});
//Levantando el servidor Puerto 3030
app.listen(3030,()=>console.log("Ejecutandose Exitosamente en puerto 3030")); 

//Configuracion para plantillas ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//RUTAS
app.use('/',indexRouter);

