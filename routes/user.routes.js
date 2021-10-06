'user strict'

//Modulo de rutas de Usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
// const auth = require('../middlewares/auth.middleware');

//Definiendo las rutas que va a estar enlazadas con el controlador de usuarios

router.post("/sing-up", userController.singUp);
router.post("/sing-in", userController.singIn);

module.exports = router;
