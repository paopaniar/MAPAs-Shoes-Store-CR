const express=require("express");
const router=express.Router();

//Controlador
const usuarioController=require("../controllers/usuarioController");


//Rutas
//localhost:3000/videojuego/
router.get("/", usuarioController.get);

module.exports = router;