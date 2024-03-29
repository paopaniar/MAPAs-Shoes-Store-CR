const express=require("express");
const router=express.Router();
const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");

router.get("/", productoController.get);
router.post("/crear",productoController.create);
router.post('/pregunta/:id', productoController.createQuestion);
router.post('/respuesta/:id', productoController.createAnswer);
router.get('/:id',productoController.getById);
router.get('/vendedor/:id',productoController.getByClient);
router.put('/:id',productoController.update);

module.exports = router;
