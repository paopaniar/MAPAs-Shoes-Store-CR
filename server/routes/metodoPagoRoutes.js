const express=require("express");
const router=express.Router();

const metodoPagoController=require("../controllers/metodoPagoController");

router.get("/", metodoPagoController.get);
router.post("/", metodoPagoController.create);
router.get('/usuario/:usuarioId', metodoPagoController.getByUsuarioId);


module.exports = router;