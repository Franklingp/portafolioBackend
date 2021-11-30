'use strict'

// Modulo de configuracion del backend

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

//Configuracion de multer para subir imagenes
// const storage = multer.diskStorage({
// 	destination: path.join(__dirname, 'public/images'),
// 	filename: (req, file, cb) => {
// 		cb(null, file.originalname);
// 	}
// });

//Importacion de rutas
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const contactRoutes = require("./routes/contact.routes");


//Middleware
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

//secccion para permitir subir imagenes al servidor

// app.use(multer({
// 	storage: storage,
// 	dest: path.join(__dirname, "public/images"),
// 	fileFilter: (req, file, cb) => {
// 		const filetype = /jpg|jpeg|png|gif/;
// 		const mimetype = filetype.test(file.mimetype);
// 		const ext = filetype.test(path.extname(file.originalname));
// 		if (mimetype && ext) {
// 			return cb(null, true);
// 		} else {
// 			return cb("Debe se subir un formato de imagen valido (jpg, png, jpeg o gif)");
// 		}
// 	}

// }).single('image'));

// Configurar cabeceras y cors

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'); //, 'Access-Control-Allow-Origin'5
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Static files
//Carpetas que se definen como publicas y poder acceder a ellas desde el navegador
app.use(express.static(path.join(__dirname, "public")));

//Rutas
app.use('/api/user', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/contact', contactRoutes);

//Exportar
module.exports = app;