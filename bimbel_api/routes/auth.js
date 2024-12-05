const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// rute register
router.post("/register", authController.register);

// rute login
router.post("/login", authController.login);

module.exports = router;