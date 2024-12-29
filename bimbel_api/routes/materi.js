const express = require("express");

const router= express.Router();

const materiController = require("../controllers/materiController");
const upload = require ("../middleware/uploadMiddleware");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/",  materiController.getAllMateri);
router.post("/upload", authMiddleware, roleMiddleware('admin'), upload.single("filemateri"), materiController.createMateri);
router.get("/:id", authMiddleware, materiController.getMateriById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), upload.single("filemateri"), materiController.updateMateri);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),materiController.deleteMateri);


// router.get("/", materiController.getAllMateri);
// router.post("/", upload.single("linkurl"), materiController.createMateri);
// router.get("/:id", materiController.getMateriById);
// router.put("/:id", upload.single("linkurl"), materiController.updateMateri);
// router.delete("/:id",  materiController.deleteMateri);
module.exports = router;