const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userRole: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  researchField: {
    type: String,
    minlength: 5,
    maxlength: 225,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;