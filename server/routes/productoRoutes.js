const express=require("express");
const router=express.Router();

const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");

router.get("/", productoController.get);
router.get('/:id',productoController.getById);
router.get('/vendedor/:id',productoController.getByClient);
router.post('/',auth.grantRole(["ADMIN"]),productoController.create);

module.exports = router;
