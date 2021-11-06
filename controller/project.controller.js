'use strict'

//Controlador de proyetos
//visualizacion de proyectos, detalles, edicion y subida

const Proyect = require('../models/project.model');
const fs = require("fs");
const path = require("path");
const config = require('../config');
const defaultImg = `${config.url}images/default.png`;

const projectController = {

	//Funsion de prueba
	test: function (req, res) {
		return res.status(200).send({ message: 'Metodo test funsionando correctamente' });
	},

	//funsion para retornar todo listado de proyectos guardado en la base de datos
	getProyects: function (req, res) {
		let id = req.params.id;
		//console.log(id);
		if (!id) {
			Proyect.find().sort('-date').exec((error, success) => {
				if (error) return res.status(500).send({ message: 'Ha ocurrido un error al intentar obtener los poryectos' });
				if (!success || success.length == 0) return res.status(404).send({ message: "No se ha encontrado retultado" });
				return res.status(200).send({ Proyect: success });
			});
		} else {
			Proyect.findById(id, (error, success) => {
				if (error) return res.status(500).send({ message: 'Ha ocurrido un error al intentar obtener los poryectos' });
				if (!success) return res.status(404).send({ message: "No se ha encontrado retultado" });
				return res.status(200).send({ Proyect: success });
			});
		}

	},

	//funsion para agregar un nuevo proyecto a la base de datos
	addProyect: function (req, res) {
		const { name, description, category, url, git } = req.body;
		let { images } = req.body;

		if (!images) {
			images = defaultImg;
		}

		let proyect = new Proyect({ name, description, category, url, git, images });

		proyect.save((error, saved) => {
			if (error) return res.status(500).send({ message: 'Ha ocurrido un error al intentar guaradar los datos' });
			if (!saved) return res.status(404).send({ message: 'No se ha encontrado los datos a guardar' });
			return res.status(200).send({ Proyect: saved });
		});
	},

	//funsion para editar un proyecto
	updateProyect: async function (req, res) {
		const id = req.params.id;
		let update = req.body;
		let images = req.file;
		if (images !== undefined) {
			try {
				let oldProject = await Proyect.findById(id);
				if (oldProject.images !== defaultImg) {
					const oldImagePath = oldProject.images.split("/")[4];
					fs.unlinkSync(path.join(__dirname, "../public/images/" + oldImagePath));
				}
				oldProject.images = `${config.url}images/${images.originalname}`;
				const response = await oldProject.save();
				return res.status(200).send({ Proyect: response });
			}
			catch (error) {
				return res.status(500).send({ error: error });
			}
		} else {
			Proyect.findByIdAndUpdate(id, update, { new: true, useFindAndModify: false }, (error, success) => {
				if (error) return res.status(500).send({ message: 'Ha ocurrido un error al intentar actualizar el proyecto' });
				if (!success) return res.status(404).send({ message: "No se ha encontrado proyecto" });
				return res.status(200).send({ Proyect: success });
			});
		}
	},

	//funsion para eliminar un proyecto
	removeProyect: function (req, res) {
		let id = req.params.id;

		Proyect.findByIdAndRemove(id, { new: true, useFindAndModify: false }, (error, deleted) => {
			if (error) return res.status(500).send({ message: 'Ha ocurrido un error al intentar eliminar el proyecto' });
			if (!deleted) return res.status(404).send({ message: "No se ha encontrado el proyecto" });
			return res.status(200).send({ Proyect: deleted });
		});
	},
};

module.exports = projectController;