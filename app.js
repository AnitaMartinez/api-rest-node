//app.js ejecuta nuestra aplicación y arranca el server

//creamos un sencillo servidor web

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

app.listen(3000, () => {
    console.log("Node server running on http://localhost:3000")
});