'use strict'

	//Controlador de usuarios 
	//Registro de usuarios e inicio de sesion
const User = require('../models/user.model');
const bcrypt = require('bcrypt-nodejs');
const auth = require('../services/auth.service');

var userController = {

	//Funsion para iniciar secion en la pagina
	singIn: function(req, res){
		let userLog = req.body;

		User.findOne({'email': userLog.email}).exec((error, userDB) => {
			if(error) return res.status(500).send({message: 'Ha ocurrido un error'});
			if(!userDB) return res.status(404).send({message: 'No existe el usuario'});
			
			//const pass = bcrypt.hashSync(userLog.password);
			//console.log(pass, userDB.password);
			//if(pass == userDB.password){	
			//}
			//res.status(401).send({message: 'pass incorrecto'});

			bcrypt.compare( userLog.password,userDB.password, function(error, sucess){
				if(error){
					console.log(false);
				}
				if(!sucess){
					
					return res.status(403).send({message: 'No se puede iniciar sesion'});
				}
				return res.status(200).send({message: 'success', token: auth.createToken(userDB)});
			});			

			//bcrypt.compare(userLog.password, userDB.password, (err,res) => {
			//	console.log(res);
			//});
			//console.log(bool);

			

		});
	},

	//Funsion para registrarte en la pagina
	singUp: function(req, res){
		let aux = req.body;
		let user = new User;

		user.name = aux.name;
		user.surname = aux.surname;
		user.email = aux.email;
		user.password = aux.password;

		User.findOne({'email': user.email}).exec((error, userFound)=> {
			if(userFound){
				return res.status(400).send({message: "El email ya esta registrado"});
			}else{
				user.save((error, userSaved) => {
					if(error) return res.status(500).send({message: "Ha ocurrido un error al intentar registrar el usuario "});
					
					//En token va una funsion donde se debe encripta un token y se envia al cliente, No se retorna datos del usuario
					return res.status(200).send({message: 'success'});
				});
			}
		});		
	}
};

module.exports = userController;