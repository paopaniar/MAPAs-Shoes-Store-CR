const express=require("express");
const router=express.Router();

const rolController=require("../controllers/rolController");
const auth=require("../middleware/auth");

router.get("/", rolController.get);

module.exports = router;
