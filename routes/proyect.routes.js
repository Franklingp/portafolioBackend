'use strict'

	//Seccion de rutas para proyectos

const express = require('express');
const router = express.Router();
const proyectController = require('../controller/proyect.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/test', proyectController.test);
router.get('/get/:id?', proyectController.getProyects);
router.post('/add', proyectController.addProyect); 		//auth this action neds the authenticatoin
router.put('/update/:id', proyectController.updateProyect);	//auth
router.delete('/remove/:id', proyectController.removeProyect); //auth


module.exports = router;