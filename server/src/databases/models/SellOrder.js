const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SellSchema = mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  seller_name:{
    type: String
  },
  residue_type:{
    type: String,
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
    // required: true,
  },
  valid_upto:{
    type: String,
    // required: true
  },
  status: {
    type: String,
    default: "Active"
  },

});
const SellOrder = mongoose.model("sell-Order", SellSchema);
module.exports = SellOrder;
