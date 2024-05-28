// Package
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");

var data = {};
// Resource
require("./utils/db");
const User = require("./models/users");
const createUser = async () => {
  const newUser = new User({
    create_id: mongoose.Types.ObjectId(),
    update_id: mongoose.Types.ObjectId(),
    fullname: "John Doe",
    email: "john.doe@example.com",
    password: "securepassword",
    no_phone: "1234567890",
    img_url: "http://example.com/johndoe.jpg",
    role: 1,
  });
};
createUser();

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
