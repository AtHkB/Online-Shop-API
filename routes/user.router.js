const express = require("express");

const {
  loginUser,
  signUpUser,
  getUserOrders,
  createUserOrders,
} = require("../controllers/userController");
const requireAuth = require("../middlewares/requireAuth");
const app = express.Router();

//Login
app.post("/login", loginUser);

//Signup
app.post("/signup", signUpUser);

//Add order
app.put("/orders/add", requireAuth, createUserOrders);

// see order
app.get("/orders", requireAuth, getUserOrders);

module.exports = app;
