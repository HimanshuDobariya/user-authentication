const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  verifyEmail,
  resetPassword,
  isAuthenticated,
  forgotPassword,
} = require("../controllers/auth.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/is-auth", verifyToken, isAuthenticated);

module.exports = router;
