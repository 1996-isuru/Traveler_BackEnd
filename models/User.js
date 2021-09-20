const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create the schema
const usersSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  living: {
    type: String,
  }, 
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  PlanedTourIds: [String],
});

const Users = mongoose.model("UsersDetails", usersSchema);

module.exports = Users;
