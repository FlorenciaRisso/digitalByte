//Require de express
const express = require('express');
//Ejecucion de express
const app = express();
//Require path
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override');
const session = require('express-session');
const indexRouter = require('./routes/index');


app.use(session({
    secret: 'secreto', // Secreto para firmar la cookie de sesión
    resave: false,
    saveUninitialized: true
}))

const recordameMiddleware = require('./middlewares/usuarios/recordameMiddleware')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(recordameMiddleware)
//Usando recursos estaticos
app.use(express.static('public'));
//Override
app.use(methodOverride('_method'));
//config utf-8
app.use((req, res, next) => {
    res.locals.usuarioLogeado = req.session.usuarioLogeado || null;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    next();
});
require('dotenv')
//Levantando el servidor Puerto 3030
app.listen(3030, () => console.log("Ejecutandose Exitosamente en puerto 3030"));

//Configuracion para plantillas ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//RUTAS
app.use('/',indexRouter);


