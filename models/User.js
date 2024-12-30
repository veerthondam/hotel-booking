const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
 {
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: true },
  phoneNumber: { type: Number, required: true, unique: true },
 },
 { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
