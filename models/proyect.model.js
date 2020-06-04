'use strict'
	
		//Modelo de proyecto en base de datos

const mongoose = require('mongoose');
const config = require("../config");
const Schema = mongoose.Schema;

var proyectModel = Schema({
	name: {type: String, lowercase: true},
	category: {type: String, lowercase: true},
	description: String,
	images: {type: String, default: `${config.url}images/default.png`}, //"http://localhost:3700/images/default.jpg"},
	date: {type: Date, default: Date.now},
	url: {type: String, lowercase: true, default: ""},
	git: {type: String, lowercase: true, default: ""}
});

module.exports = mongoose.model('Proyect', proyectModel);