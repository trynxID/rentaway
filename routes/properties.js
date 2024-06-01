const express = require("express");
const router = express.Router();

const user = require("../controllers").property;

router.get("/", user.getAllProperties);
router.post("/add", user.addProperty);
router.get("/detail/:id", user.getPropertyById);
router.put("/update/:id", user.updatePropertyById);
router.delete("/delete/:id", user.deletePropertyById);

module.exports = router;
