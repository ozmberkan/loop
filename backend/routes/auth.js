const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUser,
  signOut,
  forgotPassword,
  resetPassword,
  getUserByUsername,
  updateUser,
  getAllUsers,
} = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/getUser", getUser);
router.get("/signout", signOut);
router.get("/getUserByUsername/:username", getUserByUsername);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id", updateUser);

module.exports = router;
