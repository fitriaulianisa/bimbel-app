const express = require("express");

const router= express.Router();

const materiController = require("../controllers/materiController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, roleMiddleware("admin"), materiController.getAllMateri);
router.post("/", authMiddleware, roleMiddleware('admin'), materiController.createMateri);
router.get("/:id", authMiddleware, materiController.getMateriById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), materiController.updateMateri);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),materiController.deleteMateri);

module.exports = router;