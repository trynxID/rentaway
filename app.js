// Package
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Resource
require("./utils/db");
const User = require("./models/users");
const Property = require("./models/properties");
const Booking = require("./models/booking");

const createBooking = async () => {
  try {
    const tenant = await User.findOne({
      email: "alice.johnson@example.com",
      role: 1,
    });
    if (!tenant) {
      console.log("Tenant tidak ditemukan");
      return;
    }

    const property = await Property.findOne({
      title: "Beautiful Beach House",
    });
    if (!property) {
      console.log("Properti tidak ditemukan");
      return;
    }

    const newBooking = new Booking({
      user: tenant._id,
      property: property._id,
      create_id: tenant._id,
      update_id: tenant._id,
      start_date: new Date("2024-07-01"),
      end_date: new Date("2024-08-01"),
      status: 1, // 1: pending
    });

    await newBooking.save();
    console.log("Booking Berhasil Dibuat");
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};
createBooking();


// Add user
// const createUser = async () => {
//   const newUser = new User({
//     fullname: "John Doe",
//     email: "john.doe@example.com",
//     password: "securepassword",
//     no_phone: "1234567890",
//     img_url: "http://example.com/johndoe.jpg",
//     role: 2,
//   });
//   await newUser.save();
//   console.log("User Berhasil Dibuat");
// };
// createUser().catch((err) => console.log(err));

// Membuat property baru
// const createProperty = async () => {
//   try {
//     // Temukan pengguna dengan peran owner (role 2)
//     const owner = await User.findOne({
//       email: "john.doe@example.com",
//       role: 2,
//     });
//     if (!owner) {
//       console.log("Owner tidak ditemukan");
//       return;
//     }

//     const newProperty = new Property({
//       owner: owner._id,
//       title: "Beautiful Beach House",
//       description: "A beautiful beach house with stunning sea views.",
//       location: {
//         city: "Miami",
//         street: "Ocean Drive",
//         village: "South Beach",
//         district: "Miami-Dade",
//         province: "Florida",
//         country: "USA",
//       },
//       price: 500000,
//       images: [
//         "http://example.com/images/property1.jpg",
//         "http://example.com/images/property2.jpg",
//       ],
//       category: "house",
//       details: {
//         size: 3000, // in square feet
//         bedrooms: 4,
//         bathrooms: 3,
//         facilities: ["Swimming Pool", "Garage", "Gym"],
//       },
//       capacity: 8,
//       availability: {
//         availableFrom: new Date("2024-06-01"),
//         availableUntil: new Date("2024-12-31"),
//       },
//       status: "available",
//     });
//     await newProperty.save();
//     console.log("Properti Berhasil Dibuat");
//   } catch (error) {
//     console.error("Error creating property:", error);
//   }
// };
// createProperty();

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Define Express
const app = express();

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Handling Invalid Route
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  const errorResponse = {
    message: err.message,
    status: err.status,
    stack: err.stack,
  };
  req.app.get("env") === "development" ? res.json(errorResponse) : {};
});

module.exports = app;
