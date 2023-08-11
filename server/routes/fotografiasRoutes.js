const express=require("express");
const router=express.Router();

const fotografiasController=require("../controllers/fotografiasController");

router.get("/", fotografiasController.get);
// router.post('/crear/:id', fotografiasController.create);



module.exports = router;