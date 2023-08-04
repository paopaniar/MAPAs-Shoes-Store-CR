const express=require("express");
const router=express.Router();

const respuestaController=require("../controllers/respuestaController");
const auth=require("../middleware/auth");
router.get("/", respuestaController.get);

module.exports = router;
