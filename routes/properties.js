const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/token");
const {uploadProperty}  = require("../utils/multer");
const property = require("../controllers").property;

router.get("/", property.getAllProperties);
router.post(
  "/add",
  verifyToken,
  uploadProperty.array("images", 5),
  property.addProperty
);

router.get("/detail/:id", verifyToken, property.getPropertyById);

router.put(
  "/update/:id",
  verifyToken,
  uploadProperty.array("images", 5),
  property.updatePropertyById
);
router.delete("/delete/:id", verifyToken, property.deletePropertyById);

module.exports = router;
