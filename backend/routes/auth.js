const express = require("express");
const router = express.Router();
const { register, login, getUser, signOut } = require("../controllers/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/getUser", getUser);
router.get("/signout", signOut);

module.exports = router;
