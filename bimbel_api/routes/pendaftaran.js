const express = require("express");

const router= express.Router();

const pendaftaranController = require("../controllers/pendaftaranController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, roleMiddleware("admin"), pendaftaranController.getAllPendaftaran);
router.post("/", authMiddleware, roleMiddleware('admin'), pendaftaranController.createPendaftaran);
router.get("/:id", authMiddleware, pendaftaranController.getPendaftaranById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), pendaftaranController.updatePendaftaran);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),pendaftaranController.deletePendaftaran);

module.exports = router;