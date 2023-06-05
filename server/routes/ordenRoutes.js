const express=require("express");
const router=express.Router();

const ordenController=require("../controllers/ordenController");

router.get("/", ordenController.get);

module.exports = router;