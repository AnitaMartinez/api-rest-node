//Controladores de las rutas de nuestro API


//Esto devuelve los registros almacenados

const mongoose = require('mongoose');
const Tvshows = mongoose.model('Tvshows');

//Funciones para conseguir, insertar, actualizar y borrar registros de la base de datos


//Get - devuelve los registros completos de tvshow de la DB. Esta función envía la colección de tvshow almacenada y en formato json

exports.findAllTVShows = (req, res) => {
    Tvshows.find((err, tvshow) => {
        if(err) {
            res.send(500, err.message);
        }
        console.log('GET /tvshow');
        res.status(200).jsonp(tvshow);
    })
};

//Get - devuelve un registro con un identificador único

exports.findById = (req, res) => {
  Tvshows.findById(req.params.id, (err, tvshow) => {
      if(err) {
          return res.send(500, err.message);
      }
      console.log('GET /tvshow/', + req.params.id);
      res.status(200).jsonp(tvshow);
  })
};


//Post - insertar

exports.addTVShow = (req, res) => {
  console.log('POST');
  console.log(req.body);
  const tvshow = new Tvshows({
      title : req.body.title,
      year  : req.body.year,
      country : req.body.country,
      poster : req.body.poster,
      seasons : req.body.seasons,
      genre : req.body.genre,
      summary : req.body.summary
  });
    tvshow.save((err, tvshow) => {
        if(err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(tvshow);
    });
};

//Put - Actualizar un registro que ya existe, a partir de una id. Primero buscamos, luego actualizamos

exports.updateTVShow = (req, res) => {
  Tvshows.findById(req.params.id, (err, tvshow) => {
      tvshow.title   = req.body.petId;
      tvshow.year    = req.body.year;
      tvshow.country = req.body.country;
      tvshow.poster  = req.body.poster;
      tvshow.seasons = req.body.seasons;
      tvshow.genre   = req.body.genre;
      tvshow.summary = req.body.summary;

      tvshow.save(err => {
          if(err) {
              return res.status(500).send(err.message);
          }
          res.status(200).jsonp(tvshow);
      })
  })
};

//Delete - Eliminar un tvshow que tiene un determinado id

exports.deleteTVShow = (req, res) => {
  Tvshows.findById(req.params.id, (err, tvshow) => {
      tvshow.remove(err => {
          if(err) {
              return res.status(500).send(err.message);
          }
          res.status(200).send();
      })
  })
};

