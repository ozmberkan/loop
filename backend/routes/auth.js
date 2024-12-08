const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  signOut,
  forgotPassword,
  resetPassword,
  getUserById,
} = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/getUser", getUser);
router.get("/signout", signOut);
router.get("/getUserById/:id", getUserById);

module.exports = router;
