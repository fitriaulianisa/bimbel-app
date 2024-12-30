const express = require("express");

const router= express.Router();

const guruController = require("../controllers/guruController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", guruController.getAllGuru);
router.post("/", authMiddleware, roleMiddleware('admin'), guruController.createGuru);
router.get("/:id", authMiddleware, guruController.getGuruById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), guruController.updateGuru);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),guruController.deleteGuru);


// router.get("/", guruController.getAllGuru);
// router.post("/", guruController.createGuru);
// router.get("/:id", guruController.getGuruById);
// router.put("/:id", guruController.updateGuru);
// router.delete("/:id", guruController.deleteGuru);

module.exports = router;