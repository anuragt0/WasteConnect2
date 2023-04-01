const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CommunitySchema = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  residue_type:{
    type: String,
  },
  total_quantity: {
    type: Number,
    required: true,
  },

});
const Community = mongoose.model("community", CommunitySchema);
module.exports = Community;
