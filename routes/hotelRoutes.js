const express = require("express");
const Hotel = require("../models/Hotel");
const router = express.Router();
const authorize = require("../middleware/authorize");
const protect = require("../middleware/authMiddleware");

// Create a new hotel
router.post(
 "/",
 protect,
 authorize(["admin", "superadmin"]),
 async (req, res) => {
  try {
   const hotel = new Hotel(req.body);
   await hotel.save();
   res.status(201).json({ message: "Record created successfully" });
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 }
);

// Get all hotels
router.get("/", async (req, res) => {
 try {
  const hotels = await Hotel.find();
  res.status(200).json(hotels);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
});

// Get a hotel by ID
router.get("/:id", async (req, res) => {
 try {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) {
   return res.status(404).json({ message: "Hotel not found" });
  }
  res.status(200).json(hotel);
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
});

// Update a hotel
router.put(
 "/:id",
 protect,
 authorize(["admin", "superadmin"]),
 async (req, res) => {
  try {
   const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
   });
   if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
   }
   res.status(200).json(hotel);
  } catch (error) {
   res.status(400).json({ message: error.message });
  }
 }
);

// Delete a hotel
router.delete(
 "/:id",
 protect,
 authorize(["admin", "superadmin"]),
 async (req, res) => {
  try {
   const hotel = await Hotel.findByIdAndDelete(req.params.id);
   if (!hotel) {
    return res.status(404).json({ message: "Hotel not found" });
   }
   res.status(200).json({ message: "Hotel deleted successfully" });
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
 }
);

module.exports = router;
