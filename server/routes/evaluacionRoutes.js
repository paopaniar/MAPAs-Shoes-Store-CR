const express=require("express");
const router=express.Router();
const evaluacionController=require("../controllers/evaluacionController");
const auth=require("../middleware/auth");

router.get("/", evaluacionController.get);
router.get('/:id',evaluacionController.getById);
router.post("/",evaluacionController.create);


module.exports = router;
