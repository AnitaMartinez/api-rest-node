// https://carlosazaustre.es/como-crear-una-api-rest-usando-node-js/

// app.js ejecuta nuestra aplicación y arranca el server
// creamos un servidor web

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

//Conexión a la DB

mongoose.connect('mongodb://localhost/tvshows', (err, res) => {
    if(err) throw err;
    console.log('Connected to Database')
});

//Middlewares

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Importamos Models y Controllers

const models = require('./models/tvshow')(app, mongoose);
const TVShowCtrl = require('./controllers/tvshows');

//Example Route

const router = express.Router();
router.get('/', (req, res) => {
    res.send("Hello world")
});
app.use(router);

//API Routes. Unir los controllers de las rutas del api a las peticiones que serán nuestras llamadas al API. Parra ello, declaramos las rutas

const tvshows = express.Router();

tvshows.route('/tvshows')
    .get(TVShowCtrl.findAllTVShows)
    .post(TVShowCtrl.addTVShow);

tvshows.route('tvshows/:id')
    .get(TVShowCtrl.findById)
    .put(TVShowCtrl.updateTVShow)
    .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

app.listen(3000, () => {
    console.log('Node server running on http://localhost:3000');
});



