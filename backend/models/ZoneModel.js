const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const zoneSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    zoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Zone", zoneSchema);
