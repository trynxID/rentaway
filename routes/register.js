const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const registerController = require("../controllers").register;
router.post(
  "/save",
  [
    check("email", "invalid Email").isEmail(),
    check("no_phone", "Invalid Phone Number ").isMobilePhone("id-ID"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerController.addUser
);
module.exports = router;
