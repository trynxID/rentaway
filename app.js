// Package
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

// Ini buat percobaan
const test = async () => {
  await mongoose.connect(
    "mongodb+srv://sidiq:sidiq1131235@rentaway.plncv6d.mongodb.net/?retryWrites=true&w=majority&appName=rentaway"
  ),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  console.log("Connected to MongoDB!");
};
test();
// Sampe sini

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
