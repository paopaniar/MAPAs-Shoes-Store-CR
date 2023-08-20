const express=require("express");
const router=express.Router();


const ordenController=require("../controllers/ordenController");

router.get("/", ordenController.get);
router.post("/", ordenController.create);
router.put("/update/:id", ordenController.update);
router.get('/:id',ordenController.getById);
router.get('/vendedor/:id',ordenController.getByVendedor);
router.get('/client/:id',ordenController.getByClient);
router.get('/finalizados/:id/:estado',ordenController.getByClientbyFinalizadas);
router.get('/producto/:dia', ordenController.getCantidadCompras);
module.exports = router;