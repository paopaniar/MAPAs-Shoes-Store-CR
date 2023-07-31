const express=require("express");
const router=express.Router();

const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");

router.get("/", productoController.get);
router.post("/crear",productoController.create);
router.post('/pregunta/:id', productoController.createQuestion);
router.get('/:id',productoController.getById);
router.get('/vendedor/:id',productoController.getByClient);
router.put('/:id',productoController.update);

//router.get('/:id',auth.grantRole(["ADMIN","USER"]),videojuegoController.getById);
module.exports = router;
