'use strict'

	//Controlador de proyetos
	//visualizacion de proyectos, detalles, edicion y subida

const Proyect = require('../models/proyect.model');
const fs = require("fs");
const path = require("path");

var proyectController = {

	//Funsion de prueba
	test: function(req, res){
		return res.status(200).send({message: 'Metodo test funsionando correctamente'});
	},

	//funsion para retornar todo listado de proyectos guardado en la base de datos
	getProyects: function(req, res){
		let id = req.params.id;
		//console.log(id);
		if(!id){
			Proyect.find().sort('-date').exec((error, success) => {
				if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar obtener los poryectos'});
				if(!success || success.length == 0) return res.status(404).send({message: "No se ha encontrado retultado"});
				return res.status(200).send({Proyect: success});
			});
		}else{
			Proyect.findById(id, (error, success) => {
				if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar obtener los poryectos'});
				if(!success) return res.status(404).send({message: "No se ha encontrado retultado"});
				return res.status(200).send({Proyect: success});
			});
		}
		
	},

	//funsion para agregar un nuevo proyecto a la base de datos
	addProyect: function(req, res){
		let proyect = new Proyect;
		let request = req.body;

		proyect.name = request.name;
		proyect.description = request.description;
		proyect.category = request.category;
		proyect.url = request.url;
		proyect.Git = request.git;

		proyect.save((error, saved) => {
			if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar guaradar los datos'});
			if(!saved) return res.status(404).send({message: 'No se ha encontrado los datos a guardar'});

			return res.status(200).send({Proyect: saved});
		});
	},

	//funsion para editar un proyecto
	updateProyect: function(req, res){
		let id = req.params.id;
		let update = req.body;
		
		Proyect.findByIdAndUpdate(id, update,{new: true, useFindAndModify: false}, (error, success) => {
			if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar actualizar el proyecto'});
			if(!success) return res.status(404).send({message: "No se ha encontrado proyecto"});
			return res.status(200).send({Proyect: success});
		});
	},

	//funsion para eliminar un proyecto
	removeProyect: function(req, res){
		let id = req.params.id;

		Proyect.findByIdAndRemove(id, {new: true, useFindAndModify: false},(error, deleted) =>{
			if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar eliminar el proyecto'});
			if(!deleted) return res.status(404).send({message: "No se ha encontrado el proyecto"});
			if(deleted.images !== "http://localhost:3700/images/default.jpg"){
				let pathImg = deleted.images.split("/");
				pathImg = pathImg[4];
				fs.unlinkSync(path.join(__dirname, "../public/images/"+pathImg));
			}
			return res.status(200).send({Proyect: deleted});
		});
	},

	//metodo para subir una imagen
	uploadImage: function(req, res){
		let id = req.params.id;
		let pathImg = req.file.originalname;
		let imgUrl = "http://localhost:3700/images/"+pathImg;

	Proyect.findById(id, (error, proyect) => {
			if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar localizar el proyecto'});
			if(!proyect) return res.status(404).send({message: "No se ha encontrado el proyecto"});
			
			let pathImgPrevius = proyect.images.split('/');
			pathImgPrevius = pathImgPrevius[4];
			if(proyect.images !== imgUrl){
				if(proyect.images !== "http://localhost:3700/images/default.jpg"){
					fs.unlinkSync(path.join(__dirname, "../public/images/")+pathImgPrevius);
				}
			}
			proyect.images = imgUrl;
			proyect.save((error, saved) => {
					if(error) return res.status(500).send({message: 'Ha ocurrido un error al intentar actualizar la imagen del proyecto'});
					if(!saved) return res.status(404).send({message: "No se ha encontrado el proyecto"});
					return res.status(200).send({message: "Se ha logrado actualizar la imagen exitosamente", Proyect: saved});
			});
		});
	}

};

module.exports = proyectController;