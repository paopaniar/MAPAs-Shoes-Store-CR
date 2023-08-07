const express=require("express");
const router=express.Router();

const ordenController=require("../controllers/ordenController");
const auth=require("../middleware/auth");


router.get("/", ordenController.get);
router.post("/", ordenController.create);
router.get('/:id',ordenController.getById);
router.get('/vendedor/:id',ordenController.getByVendedor);
router.get('/client/:id',ordenController.getByClient);

module.exports = router;