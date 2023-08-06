const express=require("express");
const router=express.Router();

const metodoPagoController=require("../controllers/metodoPagoController");

router.get("/", metodoPagoController.get);

module.exports = router;