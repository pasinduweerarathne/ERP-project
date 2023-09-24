const express = require("express");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/EmployeeController");

const router = express.Router();

// GET all workouts
router.get("/", getEmployees);

// GET a single workout
router.get("/:id", getEmployee);

// POST a new workout
router.post("/", createEmployee);

// DELETE a workout
router.delete("/:id", deleteEmployee);

// UPDATE a workout
router.patch("/:id", updateEmployee);

module.exports = router;
