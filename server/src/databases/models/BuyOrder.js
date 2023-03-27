const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BuySchema = mongoose.Schema({
  buyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  buyer_name: {
    type: String
  },
  residue_type:{
    type: String,
    required: true
  },
  info: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date_of_order: {
    type: String,
    required: true,
  },
  valid_upto:{
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Active"
  },

});
const BuyOrder = mongoose.model("buy-order", BuySchema);
module.exports = BuyOrder;
