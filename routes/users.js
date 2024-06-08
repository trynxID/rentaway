const express = require("express");
const router = express.Router();
const { uploadProfile } = require("../utils/multer");
const user = require("../controllers").user;
const { verifyToken } = require("../utils/token");

router.get("/", verifyToken, user.getAllUser);

router.post(
  "/upload/:id",
  verifyToken,
  uploadProfile.single("profileImage"),
  user.uploadProfileImage
);

router.put("/update/:id", verifyToken, user.updateUser);

router.put("/logout/:id", verifyToken, user.logoutAndUpdateLastLogin);

module.exports = router;
