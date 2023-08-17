const express=require("express");
const router=express.Router();

const metodoPagoController=require("../controllers/metodoPagoController");

router.get("/", metodoPagoController.get);
router.post("/", metodoPagoController.create);


module.exports = router;