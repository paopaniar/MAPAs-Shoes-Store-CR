//Express para agregar las rutas
const express = require("express");
const router = express.Router();

//Videojuego controller para los métodos definidos
const categoriasController = require("../controllers/categoriasController");

//Definición de rutas para generos
router.get("/", categoriasController.get);

router.get("/:id", categoriasController.getById);

module.exports = router;