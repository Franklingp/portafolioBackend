'use strict'

// Controlador para gestion de mensajes de contacto

const Message = require("../models/message.model");

const contactController = {

	//Metodo de prueba
	test: function(req, res){
		return res.status(200).send({messgae: "Metodo de prueba ejecutado con exito"});
	},

	//Metodo para agregar un nuevo mensaje
	addMessage: function(req, res){
		let body = req.body;
		let message = new Message({
			name: body.name,
			email: body.email,
			message: body.message
		});
		message.save((error, saved) => {
			if(error) return res.status(500).send({message: "Ah ocurrio un error al intentar guardar el mensaje"});
			if(!saved) return res.status(404).send({message: "No se ha podido localizar el mensaje"});
			return res.status(200).send({Message: saved});
		});
	},

	//Metodo para observar todos los mensajes
	getMessage: function(req, res){
		const id = req.params.id;
		if(id && id != ""){
			Message.findById(id).exec((error, found) => {
				if(error) return res.status(500).send({message: "Ah ocurrido un error al intencar localizar el mensaje"});
				if(!found) return res.status(404).send({message: "No se han podido localizar el mensaje"});
				
				//Actualizo el estatus de el mensaje para guardarlo en la base de datos como leido
				found.read = !found.read;
				found.save((error, updated) => {
					if(error) return res.status(500).send({message: "Ah ocurrido un error al intencar localizar el mensaje"});
					if(!updated) return res.status(404).send({message: "No se han podido localizar el mensaje"});
					return res.status(200).send({Message: updated});
				})

			});
		}else{
			Message.find().sort("-date").exec((error, found) => {
				if(error) return res.status(500).send({message: "Ah ocurrido un error al intencar localizar los mensajes"});
				if(!found) return res.status(404).send({message: "No se han podido localizar los mensajes"});
				return res.status(200).send({Message: found});
			});
		}
	},

	//Metodo para eliminar un mensaje de la lista
	deleteMessage: function(req, res){
		const id = req.params.id;
		Message.findByIdAndRemove(id, {new: true, useFindAndModify: false}).exec((error, removed) => {
			if(error) return res.status(500).send({message: "Ha ocurrido un error al intentar eliminar el mensaje"});
			if(!removed) return res.status(404).send({message: "No se ha podido encontar el mensaje que se quiere eliminar"});
			return res.status(200).send({Message: removed});
		});
	}
}

module.exports = contactController;