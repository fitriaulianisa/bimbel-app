const express = require("express");

const router= express.Router();

const muridController = require("../controllers/muridController");

// impor middleware auth dan role
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/",   muridController.getAllMurid);
router.post("/", authMiddleware, roleMiddleware('admin'), muridController.createMurid);
router.get("/:id",  muridController.getMuridById);
router.put("/:id", authMiddleware, roleMiddleware("admin"), muridController.updateMurid);
router.delete("/:id", authMiddleware, roleMiddleware("admin"),muridController.deleteMurid);


// router.get("/", muridController.getAllMurid);
// router.post("/", muridController.createMurid);
// router.get("/:id", muridController.getMuridById);
// router.put("/:id", muridController.updateMurid);
// router.delete("/:id", muridController.deleteMurid);
module.exports = router;