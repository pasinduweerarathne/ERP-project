const ZoneModel = require("../models/ZoneModel");

const getZone = async (req, res) => {
  try {
    const zones = await ZoneModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(zones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createZone = async (req, res) => {
  const { name, zoneNumber } = req.body;
  try {
    const zone = await ZoneModel.create({ name, zoneNumber });
    res.status(200).json(zone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteZone = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { getZone, createZone, deleteZone };
