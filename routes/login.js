const express = require("express");
const router = express.Router();
const { validationResult, check } = require("express-validator");

const loginController = require("../controllers").login;

router.post(
  "/auth",
  [
    check("email", "Invalid Email").isEmail(),
    check("password", "Password is empty").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  loginController.auth
);
module.exports = router;
