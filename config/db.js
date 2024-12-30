const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
 try {
  await mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
  });
  console.log("MongoDB connected");
 } catch (error) {
  console.error("Database connection error:", error.message);
  process.exit(1);
 }
};

module.exports = connectDB;
