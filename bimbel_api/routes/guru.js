const express = require("express");

const router= express.Router();

const guruController = require("../controllers/guruController");

// impor middleware auth dan role
// router.get("/", muridController.getAllMurid);
router.post("/", guruController.createGuru);
router.get("/:id", guruController.getGuruById);
router.put("/:id", guruController.updateGuru);
router.delete("/:id", guruController.deleteGuru);

module.exports = router;