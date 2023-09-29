const Zone = require("../models/ZoneModel");
const Income = require("../models/IncomeModel");

const getIncomes = async (req, res) => {
  try {
    const { zoneSlug, category } = req.params;
    const expenses = await Income.find({ zoneSlug, categoryName: category });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createIncome = async (req, res) => {
  try {
    const { zoneId, categoryName, factoryName, description, type, amount } =
      req.body;
    const zone = await Zone.findById(zoneId);

    if (!zone) {
      return res.status(404).json({ error: "Zone not found" });
    }

    const income = new Income({
      zoneId: zone._id,
      zoneSlug: zone.name,
      categoryName,
      factoryName,
      description,
      type,
      amount,
    });

    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;

    const updatedIncome = await Income.findByIdAndUpdate(id, newData, {
      new: true,
    });
    res.json(updatedIncome);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const incomeDetails = await Income.findById(id);
    if (!incomeDetails) {
      return res.status(400).json({ error: "No details found from this id" });
    }
    const deletedDetails = await Income.findByIdAndRemove(incomeDetails._id);
    res.status(200).json(deletedDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getIncomes, createIncome, editIncome, deleteIncome };
