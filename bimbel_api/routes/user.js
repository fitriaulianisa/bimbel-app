const express = require("express");

const router= express.Router();

const userController = require("../controllers/userController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, roleMiddleware("admin"), userController.getAllUser);
router.post("/", authMiddleware, roleMiddleware('admin'), userController.createUser);
router.get("/:id", authMiddleware, userController.getUserById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), userController.updateUser);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), userController.deleteUser);

module.exports = router;