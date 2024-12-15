const express = require("express");

const router= express.Router();

const muridController = require("../controllers/muridController");

// impor middleware auth dan role
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// router.get("/", authMiddleware, roleMiddleware("admin"), muridController.getAllMurid);
// router.post("/", authMiddleware, roleMiddleware('admin'), muridController.createMurid);
// router.get("/:id", authMiddleware, muridController.getMuridById);
// router.put("/:id", authMiddleware, roleMiddleware("admin"), muridController.updateMurid);
// router.delete("/:id", authMiddleware, roleMiddleware("admin"),muridController.deleteMurid);


router.get("/", jadwalController.getAllJadwal);
router.post("/", jadwalController.createJadwal);
router.get("/:id", jadwalController.getJadwalById);
router.put("/:id", jadwalController.updateJadwal);
router.delete("/:id", jadwalController.deleteJadwal);

module.exports = router;