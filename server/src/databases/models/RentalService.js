const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const RentalSchemaa = mongoose.Schema({
  machine_type: {
    type: String,
    required: true
  },
  imgSrc:{
    type: String,
    default: "https://www.cimmyt.org/content/uploads/2020/06/CIMMYT-Mechanization-ZIM-20122017-0005.jpg"
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
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  }

});
const RentalService = mongoose.model("rental-service", RentalSchemaa);
module.exports = RentalService;
