const express = require("express");

const router= express.Router();

const jenisBimbelController = require("../controllers/jenisBimbelController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get("/", authMiddleware, roleMiddleware("admin"), jenisBimbelController.getAllJenisBimbel);
router.post("/", authMiddleware, roleMiddleware('admin'), jenisBimbelController.createJenisBimbel);
router.get("/:id", authMiddleware, jenisBimbelController.getJenisBimbelById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), jenisBimbelController.updateJenisBimbel);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),jenisBimbelController.deleteJenisBimbel);


// router.get("/", jenisBimbelController.getAllJenisBimbel);
// router.post("/", jenisBimbelController.createJenisBimbel);
// router.get("/:id", jenisBimbelController.getJenisBimbelById);
// router.put("/:id", jenisBimbelController.updateJenisBimbel);
// router.delete("/:id", jenisBimbelController.deleteJenisBimbel);

module.exports = router;