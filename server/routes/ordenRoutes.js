const express=require("express");
const router=express.Router();


const ordenController=require("../controllers/ordenController");
router.get('/masVendido/:id', ordenController.getProductoMasVendidoVendedor);
router.get("/mejor",ordenController.getMejoresVendedores);
router.get("/", ordenController.get);
router.get("/cantidades", ordenController.getCantidadCompras);
router.post("/", ordenController.create);
router.put("/update/:id", ordenController.update);
router.get('/:id',ordenController.getById);
router.get('/vendedor/:id',ordenController.getByVendedor);
router.get('/client/:id',ordenController.getByClient);
router.get('/finalizados/:id/:estado',ordenController.getByClientbyFinalizadas);
router.get("/peor",ordenController.getPeoresVendedores);
router.get('/cliente-con-mas-compras', ordenController.getClienteConMasCompras);
router.get('/evaluaciones-por-escala', ordenController.getCantidadEvaluacionesPorEscala);
router.get('/productoTop/:numeroMes', ordenController.getVentaProductoTop5);
module.exports = router;