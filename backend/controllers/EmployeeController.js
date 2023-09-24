const EmployeeModel = require("../models/EmployeeModel");

const mongoose = require("mongoose");

// get all workouts
const getEmployees = async (req, res) => {
  const workouts = await EmployeeModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
const getEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findById(id);

  if (!employee) {
    return res.status(404).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

// create a new workout
const createEmployee = async (req, res) => {
  const { name, nic, address, salary } = req.body;

  // add to the database
  try {
    const employee = await EmployeeModel.create({ name, nic, address, salary });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

// update a workout
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such employee" });
  }

  const employee = await EmployeeModel.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    {new: true}
  );

  if (!employee) {
    return res.status(400).json({ error: "No such employee" });
  }

  res.status(200).json(employee);
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
};
