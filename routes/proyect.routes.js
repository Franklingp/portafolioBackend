'use strict'

	//Seccion de rutas para proyectos

const express = require('express');
const router = express.Router();
const proyectController = require('../controller/proyect.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/test', proyectController.test);
router.get('/get/:id?', proyectController.getProyects);
router.post('/add', auth, proyectController.addProyect);
router.put('/update/:id', auth, proyectController.updateProyect);
router.delete('/remove/:id', auth, proyectController.removeProyect);
router.post('/uploadImage/:id', auth, proyectController.uploadImage);


module.exports = router;