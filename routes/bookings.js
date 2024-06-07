const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const bookingController = require("../controllers").booking;

router.get("/", bookingController.getAllBookings);

router.post(
  "/",
  [
    check("property", "Properti diperlukan").not().isEmpty(),
    check("start_date", "Tanggal mulai diperlukan").not().isEmpty(),
    check("duration_in_months", "Durasi dalam bulan diperlukan").isInt({
      min: 1,
    }),
  ],
  bookingController.addBooking
);

module.exports = router;
