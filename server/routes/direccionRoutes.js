const express=require("express");
const router=express.Router();

const direccionController=require("../controllers/direccionController");

router.get("/", direccionController.get);
router.get("/:id", direccionController.getById);
router.get("/usuario/:usuarioId", direccionController.getByUsuario);
router.post("/", direccionController.create);
module.exports = router;