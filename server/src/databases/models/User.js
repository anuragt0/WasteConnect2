const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  aadhaar:{
    type: String
  },
 
  phone: {
    type: String,
  },

  address: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },

});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = User;
