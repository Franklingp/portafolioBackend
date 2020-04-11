'use strict'

	//Servicio que se encarga de la encriptacion de el password para guardar en la base de datos
const jwt = require('jwt-simple');
const moment = require('moment');
const Secret = "Mi clave secreta"; 		//No se recomienda dejarlo aqui

const auth = {

	//Funsion para crear un token y retornarlo al registrarse o iniciar sesion.
	createToken: function(user){
		const payload = {
			sub: user._id,							//Seccion del token que contiene los datos que interesan en el login (no recomienda usar mismo id de mongo)
			iat: moment().unix(),					//seccion donde se guarda cuando se crea el token
			exp: moment().add(14, 'days').unix()	//seccion donde se define cuando expira el token
		};

		return jwt.encode(payload, Secret);
	}
};

module.exports = auth;