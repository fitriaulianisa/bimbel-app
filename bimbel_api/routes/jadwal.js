const express = require("express");

const router= express.Router();

const jadwalController = require("../controllers/jadwalController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, roleMiddleware("admin"), jadwalController.getAllJadwal);
router.post("/", authMiddleware, roleMiddleware('admin'), jadwalController.createJadwal);
router.get("/:id", authMiddleware, jadwalController.getJadwalById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), jadwalController.updateJadwal);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),jadwalController.deleteJadwal);

module.exports = router;