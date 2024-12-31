const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
 const { email, password, phoneNumber } = req.body;

 try {
  const existingUser = await User.findOne({
   $or: [{ email }, { phoneNumber }],
  });
  if (existingUser) {
   return res
    .status(400)
    .json({ message: "User with this email or phone number already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword, phoneNumber });
  await user.save();

  res.status(201).json({ message: "User created successfully" });
 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
};

const login = async (req, res) => {
 const { email, password } = req.body;

 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
   return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user._id);

  res.cookie("jwt", token, {
   httpOnly: true, // Prevents JavaScript access to the cookie
   secure: process.env.NODE_ENV === "development", // Use secure cookies in production
   sameSite: "strict", // Protect against CSRF
   maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.status(200).json({ success: true });
 } catch (error) {
  res.status(500).json({ message: "Server error" });
 }
};

const logout = (req, res) => {
 res.cookie("jwt", "", {
  httpOnly: true,
  expires: new Date(0),
 });
 res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
