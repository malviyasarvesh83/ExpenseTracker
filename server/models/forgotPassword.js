const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  expiresBy: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ForgotPassword = mongoose.model("forgotPassword", forgotPasswordSchema);

module.exports = ForgotPassword;