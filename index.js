'use strict'

// Desarrollo de Backend de el proyecto "portafolio"
// con Node JS, express, mongoose, jwt-simple, body-parser...

//Aqui se configura el enlace con la base de datos con mongoose

const mongoose = require('mongoose');
const port = 3700;
const app = require('./app.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser: true})
	.then(() => {
		console.log("Se ha enlazado con la base de datos exitosamente");
		app.listen(port, () => {
				console.log("Servidor corriendo exitosamente en la url: http://localhost:"+port);
		});
	})
	.catch((error) => {console.log(error)});
