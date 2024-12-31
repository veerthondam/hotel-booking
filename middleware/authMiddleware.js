const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
 let token;

 // First check for JWT token in cookies
 if (req.cookies && req.cookies.jwt) {
  token = req.cookies.jwt;
 }
 // If no cookie, check for Bearer token in Authorization header
 else if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
 ) {
  token = req.headers.authorization.split(" ")[1];
 }

 // If no token found in either cookies or Authorization header
 if (!token) {
  return res.status(401).json({ message: "Not authorized, no token" });
 }

 try {
  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Get user from database (excluding password)
  const user = await User.findById(decoded.userId).select("-password");

  // If no user found
  if (!user) {
   return res.status(401).json({ message: "User not found" });
  }

  // Attach user to request object
  req.user = user;
  next();
 } catch (error) {
  // Handle token verification errors
  return res.status(401).json({ message: "Not authorized, token failed" });
 }
};

module.exports = protect;
