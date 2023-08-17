const express=require("express");
const router=express.Router();

const direccionController=require("../controllers/direccionController");

// router.get("/", direccionController.get);
// router.post("/", direccionController.create);

router.get("/", direccionController.get);
router.get("/:id", direccionController.getById);
router.post("/", direccionController.create);
// router.put("/:id", direccionController.update);


module.exports = router;