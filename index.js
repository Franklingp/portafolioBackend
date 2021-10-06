'use strict'

// Desarrollo de Backend de el proyecto "portafolio"
// con Node JS, express, mongoose, jwt-simple, body-parser...
//"service mongod start" para iniciar servidor local de mongodb 

//Aqui se configura el enlace con la base de datos con mongoose

const { port, dataBase, url } = require("./config");
const mongoose = require('mongoose');
const app = require('./app.js');

mongoose.Promise = global.Promise;
mongoose.connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Se ha enlazado con la base de datos exitosamente");
		app.listen(port, () => {
			console.log("Servidor corriendo exitosamente en la url: " + url);
		});
	})
	.catch((error) => { console.log(error) });
