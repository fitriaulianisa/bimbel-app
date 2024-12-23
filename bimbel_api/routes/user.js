const express = require("express");

const router= express.Router();

const userController = require("../controllers/userController");

// impor middleware auth dan role
// router.get("/", muridController.getAllMurid);
router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;