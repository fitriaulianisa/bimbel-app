const express = require("express");

const router= express.Router();

const kelasController = require("../controllers/kelasController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware,roleMiddleware("admin"), kelasController.getAllKelas);
router.post("/", authMiddleware, roleMiddleware('admin'), kelasController.createKelas);
router.get("/:id", authMiddleware, kelasController.getKelasById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), kelasController.updateKelas);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),kelasController.deleteKelas);

module.exports = router;