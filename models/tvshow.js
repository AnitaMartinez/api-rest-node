/*
modelo : base de datos de series de TV. Aquí definimos el modelo de nuestros datos
mongoose permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB,
facilita crear y trabajar con esquemas
 usaremos Mongoose para guardar la información en la base de datos (siguiendo el modelo)
*/

exports = module.exports = (app, mongoose) => {

    const tvShowSchema = new mongoose.Schema({
        title : { type : String },
        year : { type : Number },
        country : { type : String },
        poster : { type : String },
        seasons : { type : Number },
        genre : { type : String, enum : [
                'Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy'
            ]},
        summary : { type : String }
    });

    mongoose.model('TVShow', tvShowSchema)

};




