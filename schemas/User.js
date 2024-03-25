const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [
    {
      name: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model(User, userSchema);
