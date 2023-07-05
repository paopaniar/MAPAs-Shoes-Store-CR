const express=require("express");
const router=express.Router();

const ordenProductoController=require("../controllers/ordenProductoController");

router.get("/", ordenProductoController.get);


module.exports = router;