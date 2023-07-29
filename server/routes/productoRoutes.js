const express=require("express");
const router=express.Router();

const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");

router.get("/", productoController.get);
router.post("/",productoController.create);
router.get('/:id',productoController.getById);
router.get('/vendedor/:id',productoController.getByClient);


module.exports = router;
