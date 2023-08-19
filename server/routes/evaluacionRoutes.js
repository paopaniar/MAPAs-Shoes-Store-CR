const express=require("express");
const router=express.Router();
const evaluacionController=require("../controllers/evaluacionController");
const auth=require("../middleware/auth");

router.get("/", evaluacionController.get);
router.post("/",evaluacionController.create);
router.get('/:id',evaluacionController.getById);

module.exports = router;
