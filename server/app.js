const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

app.use(cors());
app.use(morgan('tiny'));
app.use(history());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Esto debe ir al final
app.use('/libro', require('./routes/libro'));
app.use('/usuario', require('./routes/usuario'));
app.use('/prestamo', require('./routes/prestamo'));

// API REST --> HTTP -> Web
// GET, POST -->  Enviar y recuperar información

// GET --> No modifica el estado de la base de datos
// HEAD
// POST --> Si modifica el estado de la base de datos
// PUT 

// Nestra primera petición
// app.get('/', function(req, res) {
//    res.send('Hola mundo');
// });
// 
// app.get('/hola', function(req, res) {
//    res.send('Hola mundo desde la ruta hola');
// });
// 
// app.get('/bonjour', function(req, res) {
//    res.send('Bonjour mesieur');
// });
// 
// Decirle a nuestra API en qué puerto correr (escuchar)
app.listen(3000, function() {
   console.log('API está corriendo');
});
