'use strict'

//Modulo de rutas para los mensajes de contacto

const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const contactController = require("../controller/contact.controller");

router.get("/test", contactController.test);
router.post("/add", contactController.addMessage);
router.get("/get/:id?", contactController.getMessage); //auth
router.delete("/remove/:id", contactController.deleteMessage); //auth

module.exports = router;