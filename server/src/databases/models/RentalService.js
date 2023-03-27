const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RentalSchemaa = mongoose.Schema({
  machine_type: {
    type: String,
    required: true
  },
  description:{
    type: String,
  },
  owner: {
    type: String,
  },
  location: {
    type: String,
  },
  rate: {
    type: Number,
    required: true
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
  }

});
const RentalService = mongoose.model("rental-service", RentalSchemaa);
module.exports = RentalService;
