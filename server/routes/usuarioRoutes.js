const express=require("express");
const router=express.Router();

//Controlador
const usuarioController=require("../controllers/usuarioController");


router.post("/login", usuarioController.login);

router.post("/registrar", usuarioController.register);
//Rutas
//localhost:3000/videojuego/
router.get("/", usuarioController.get);
router.get('/:id',usuarioController.getById);
module.exports = router;