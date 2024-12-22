const express = require("express");

const router= express.Router();

const jenisBimbelController = require("../controllers/jenisBimbelController");

// impor middleware auth dan role
// router.get("/", muridController.getAllMurid);
router.post("/", jenisBimbelController.createJenisBimbel);
router.get("/:id", jenisBimbelController.getJenisBimbelById);
router.put("/:id", jenisBimbelController.updateJenisBimbel);
router.delete("/:id", jenisBimbelController.deleteJenisBimbel);

module.exports = router;