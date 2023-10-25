import express from "express";
const router = express.Router();
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Checking if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already registered." });
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );
  res.header("x-auth-token", token).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.SECRET_KEY
  );
  res.header("x-auth-token", token).json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default router;
