// app.js ejecuta nuestra aplicación y arranca el server
// creamos un servidor web

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose'),
    router = express.Router();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(methodOverride());

router.get('/', (req, res) => {
   res.send("Hello world")
});

app.use(router);

//implementar la conexión a la base de datos a partir de nuestro model tvshow

mongoose.connect('mongodb://localhost/tvshow', (err, res) => {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err)
    }
    if(res) {
        console.log('Connected to Database')
    }
    app.listen(3000, () => {
        console.log('Node server running on http://localhost:3000');
    });
});

//Unir los controllers de las rutas del api a las peticiones que serán nuestras llamadas al API
//Parra ello, declaramos las rutas. API Routes

const TVShowCtrl = require('./controllers/tvshow');
const tvshows = express.Router();

tvshows.route('/tvshow')
    .get(TVShowCtrl.findAllTVShows)
    .post(TVShowCtrl.addTVShow);

tvshows.route('tvshow/:id')
    .get(TVShowCtrl.findById)
    .put(TVShowCtrl.updateTVShow)
    .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);




