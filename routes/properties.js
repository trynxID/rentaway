const express = require("express");
const router = express.Router();

const user = require("../controllers").property;

router.get("/", user.getAllProperties);
router.post("/add", user.addProperty);

module.exports = router;
