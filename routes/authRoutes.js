const express = require("express");
const { signup, login, logout } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check-auth", protect, (req, res) => {
 res.status(200).json({ isAuthenticated: true, user: req.user });
});

module.exports = router;
