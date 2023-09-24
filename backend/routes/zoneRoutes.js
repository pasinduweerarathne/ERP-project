const express = require("express");
const {
  getZone,
  createZone,
  deleteZone,
} = require("../controllers/ZoneController");

const router = express.Router();

// GET zone
router.get("/", getZone);

// create zone
router.post("/", createZone);

// delete zone
router.delete("/:id", deleteZone);

module.exports = router;
