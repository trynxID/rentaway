const Booking = require("../models/bookings");
const Property = require("../models/properties");
const { validationResult } = require("express-validator");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("property").populate("user");
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

const addBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { property, user, start_date, duration_in_months } = req.body;

  try {
    const propertyObj = await Property.findById(property);
    if (!propertyObj) {
      return res.status(400).json({ msg: "Properti tidak ditemukan" });
    }

    const newBooking = new Booking({
      property,
      user,
      start_date,
      duration_in_months,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ msg: "Pemesanan berhasil ditambahkan", booking: newBooking });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Kesalahan server");
  }
};

module.exports = {
  getAllBookings,
  addBooking,
};
