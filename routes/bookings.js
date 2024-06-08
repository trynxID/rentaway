const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { verifyToken } = require("../utils/token");
const bookingController = require("../controllers").booking;

router.get("/", bookingController.getAllBookings);

router.post(
  "/add/:property",
  [
    check("start_date", "Tanggal mulai diperlukan").not().isEmpty(),
    check("duration_in_months", "Durasi dalam bulan diperlukan").isInt({
      min: 1,
    }),
  ],
  verifyToken,
  bookingController.addBooking
);

module.exports = router;
