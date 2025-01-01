const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  location: {
   address: String,
   city: String,
   state: String,
   country: String,
   zipCode: String,
  },
  propertyType: String,
  description: String,
  category: { type: Number, min: 1, max: 5 }, // Star rating
  amenities: [String], // e.g., ['couple friendly', 'breakfast', 'free wifi']
  images: [String],
  rooms: [
   {
    type: { type: String },
    price: Number,
    capacity: Number,
    amenities: [String],
    available: Boolean,
   },
  ],
 },
 { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
