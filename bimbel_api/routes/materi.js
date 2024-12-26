const express = require("express");

const router= express.Router();

const materiController = require("../controllers/materiController");
const upload = require ("../middleware/uploadMiddleware");

// impor middleware auth dan role
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

// router.get("/", authMiddleware, roleMiddleware("admin"), muridController.getAllMurid);
// router.post("/", authMiddleware, roleMiddleware('admin'), muridController.createMurid);
// router.get("/:id", authMiddleware, muridController.getMuridById);
// router.put("/:id", authMiddleware, roleMiddleware("admin"), muridController.updateMurid);
// router.delete("/:id", authMiddleware, roleMiddleware("admin"),muridController.deleteMurid);


router.get("/", materiController.getAllMateri);
router.post("/", upload.single("foto"), materiController.createMateri);
router.get("/:id", materiController.getMateriById);
router.put("/:id", upload.single("foto"), materiController.updateMateri);
router.delete("/:id",  materiController.deleteMateri);
module.exports = router;