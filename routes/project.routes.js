'use strict'

//Seccion de rutas para proyectos

const express = require('express');
const router = express.Router();
const projectController = require('../controller/project.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/test', projectController.test);
router.get('/get/:id?', projectController.getProyects);
router.post('/add', auth, projectController.addProyect);
router.put('/update/:id', auth, projectController.updateProyect);
router.delete('/remove/:id', auth, projectController.removeProyect);

module.exports = router;