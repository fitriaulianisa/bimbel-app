const express = require("express");

const router= express.Router();
// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const userController = require("../controllers/userController");

// impor middleware auth dan role
// router.get("/", userController.getAllUser);
// router.post("/", userController.createUser);
// router.get("/:id", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.delete("/:id", userController.deleteUser);

// Pasang authMiddleware sebelum userController
router.get("/", authMiddleware, userController.getAllUser);
router.post("/", authMiddleware, userController.createUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;

module.exports = router;