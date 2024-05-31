const express = require("express");
const router = express.Router();

const user = require("../controllers").property;

router.get("/", user.getAllProperties);

module.exports = router;
