const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const getUserIdFromToken = (req) => {
  const authHeader = req.headers["authorization"];

  // If Authorization header exists and it starts with 'Bearer ', extract the token
  if (authHeader && authHeader.startsWith("Bearer ")) {
    // Extract the token part from the header
    const token = authHeader.substring("Bearer ".length);
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded._id;
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up user
const signUpUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    //create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const id = getUserIdFromToken(req);
  try {
    const _id = id;
    const user = await User.find({ _id });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUserOrders = async (req, res) => {
  const id = getUserIdFromToken(req);
  const { products } = req.body;

  if (products?.length === 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }
  // Find the user by ID and update
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { products },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(updatedUser);
};

module.exports = { loginUser, signUpUser, getUserOrders, createUserOrders };
