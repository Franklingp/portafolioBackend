'use strict'

	//Modelo de usuario que llevara el login y registro para gestionar la informacion
	//de los proyectos publicados en la pagina

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

	//Modelo de usuario para la aplicacion
var userModel = Schema({
	name: {type: String, lowercase: true},
	surname: {type: String, lowercase: true},
	email: {type: String, lowercase: true},  //, unique: true
	password: String,//{type: String, select: true},
	singUp: {type: Date, default: Date.now},
	lastSingIn: Date,
	images: {type: String}
});

	//Middleware que encripta el password antes de guardarlo en la base de datos por seguridad
userModel.pre('save', function(){

	if(!this.isModified('password')) return true;			//Condicional para comprobar si se ha modificado el pass
	this.password = bcrypt.hashSync(this.password);			//Con este metodo no se manejan promesas
	//console.log(this);
	
}); 

module.exports = mongoose.model('User', userModel);