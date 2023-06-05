const express=require("express");
const router=express.Router();

const direccionController=require("../controllers/direccionController");

router.get("/", direccionController.get);

module.exports = router;