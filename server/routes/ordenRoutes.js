const express=require("express");
const router=express.Router();

const ordenController=require("../controllers/ordenController");

router.get("/", ordenController.get);
router.get('/:id',ordenController.getById);
router.get('/vendedor/:id',ordenController.getByVendedor);
router.get('/client/:id',ordenController.getByClient);
module.exports = router;