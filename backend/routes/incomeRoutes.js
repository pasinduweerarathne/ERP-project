const express = require("express");
const {
  createIncome,
  getIncomes,
  deleteIncome,
  editIncome,
} = require("../controllers/IncomesController");

const router = express.Router();

router.post("/", createIncome);
router.get("/:zoneSlug/:category", getIncomes);
router.patch("/:id", editIncome);
router.delete("/:id", deleteIncome);

module.exports = router;
