const express=require("express");
const router=express.Router();

const consultaProductoController=require("../controllers/consultaProductosController");
const auth=require("../middleware/auth");

router.get("/", consultaProductoController.get);
router.get('/:id',consultaProductoController.getByPregunta);
router.post('/respuesta/:id', consultaProductoController.createResponses);


module.exports = router;
