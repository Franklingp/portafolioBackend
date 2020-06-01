'use strict'

// Desarrollo de Backend de el proyecto "portafolio"
// con Node JS, express, mongoose, jwt-simple, body-parser...

//Aqui se configura el enlace con la base de datos con mongoose

const config = require("./config");
const mongoose = require('mongoose');
const port = config.port;
const app = require('./app.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.dataBase, {useNewUrlParser: true})
	.then(() => {
		console.log("Se ha enlazado con la base de datos exitosamente");
		app.listen(port, () => {
				console.log("Servidor corriendo exitosamente en la url: "+config.url);
		});
	})
	.catch((error) => {console.log(error)});
