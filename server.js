const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
 const allowedOrigins = req.headers.origin;
 res.header("Access-Control-Allow-Origin", allowedOrigins);
 res.header("Access-Control-Allow-Credentials", "true");
 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
 res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
 if (req.method === "OPTIONS") {
  return res.sendStatus(200);
 }
 next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
