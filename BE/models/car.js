const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  carName: String,
  timeCreated: String,
  type: ["Truck", "SUV", "Hybrid"],
  lastCon: Date
});

module.exports = mongoose.model("Car", Schema);
