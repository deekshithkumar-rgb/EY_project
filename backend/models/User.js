const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, // Use email field
  password: { type: String, required: true },
});

// Pre-save middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Export User model
module.exports = mongoose.model("User", userSchema);
