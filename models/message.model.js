'use strict'

// Modelo de mensaje de contactos

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageModel = Schema({
	name: {type: String, lowercase: true, required: true},
	email: {type: String, lowercase: true, required: true},
	message: {type: String, lowercase: true, required: true},
	date: {type: Date, default: Date.now()},
	read: {type: Boolean, default: false}
});

module.exports = mongoose.model("message", messageModel);

