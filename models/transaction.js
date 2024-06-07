const mongoose = require("mongoose");
const { getCurrentTime } = require("../utils/time");

const TransactionSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  payment_method: {
    type: String,
    enum: ["Transfer", "ShopeePay", "GoPay", "DANA"],
    required: true,
  },
  transaction_date: {
    type: String,
    default: getCurrentTime,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
