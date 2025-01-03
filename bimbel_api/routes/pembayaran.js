const express = require("express");

const router= express.Router();

const pembayaranController = require("../controllers/pembayaranController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/",  authMiddleware, roleMiddleware('admin', 'user'), pembayaranController.getAllPembayaran);
router.post("/", authMiddleware, roleMiddleware('user'), pembayaranController.createPembayaran);
router.get("/:id", authMiddleware, roleMiddleware('admin', 'user'), pembayaranController.getPembayaranById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), pembayaranController.updatePembayaran);



                // router.get("/", pembayaranController.getAllPembayaran);
                // router.post("/", pembayaranController.createPembayaran);
                // router.get("/:id", pembayaranController.getPembayaranById);
                // router.put("/:id", pembayaranController.updatePembayaran);
                // router.delete("/:id", pembayaranController.deletePembayaran);
module.exports = router;