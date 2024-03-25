const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const uuid = require("node-uuid");

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuid.v1();
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  products: [
    {
      name: String,
      quantity: Number,
    },
  ],
});

// creating a custom static method

userSchema.statics.signup = async function (email, password) {
  //validation

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case letter, a number and a symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

// static custom login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User doesn't exist or incorrect email");
  }
  //TODO fixed compare
  // const match = await bcrypt.compare(password, user.password);

  // if (!match) {
  //   throw Error("Incorrect password");
  // }

  return user;
};

module.exports = mongoose.model("User", userSchema);
