//Require de express
const express=require('express');

//Ejecucion de express
const app=express(); 

//Require path
const path=require('path');

const indexRouter = require('./routes/index.routes');


//Usando recursos estaticos
app.use(express.static('public'));

//Levantando el servidor Puerto 3080
app.listen(3030,()=>console.log("Exito")); 

//Configuracion para plantillas ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//RUTAS
app.use('/',indexRouter);

