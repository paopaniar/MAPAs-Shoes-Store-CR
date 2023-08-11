const express=require("express");
const router=express.Router();
const upload = require("../middleware/multerConfig");

const productoController=require("../controllers/productoController");
const auth=require("../middleware/auth");

router.get("/", productoController.get);
// router.post("/", upload.array("myFile", 5), productoController.create);
router.post('/pregunta/:id', productoController.createQuestion);
router.post('/respuesta/:id', productoController.createAnswer);
router.get('/:id',productoController.getById);
router.get('/vendedor/:id',productoController.getByClient);
router.put('/:id',productoController.update);

//router.get('/:id',auth.grantRole(["ADMIN","USER"]),videojuegoController.getById);
module.exports = router;
