const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create the schema
const planTourDetails = new Schema({
  useremail: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  planTourName: {
    type: String,
    required: true,
  },
  locations: [
    {
      locationName: {
        type: String,
      },
      locationLatitude: {
        type: String,
      },
      locationLongitude: {
        type: String,
      }
    }
  ],
});

const PlanTourDetails = mongoose.model("PlanTourDetails", planTourDetails);

module.exports = PlanTourDetails;
