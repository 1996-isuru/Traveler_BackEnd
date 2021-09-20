const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create the schema
const allTours = new Schema({
  email: {
    type: String,
    required: true,
  },
  owntours: [String],
  addtours: [String],
});

const AllTours = mongoose.model("AllTours", allTours);

module.exports = AllTours;
