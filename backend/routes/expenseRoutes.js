const express = require("express");
const {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
} = require("../controllers/ExpenseController");
const router = express.Router();

router.post("/", createExpense);
router.get("/:zoneSlug/:category", getExpenses);
router.patch("/:id", editExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
