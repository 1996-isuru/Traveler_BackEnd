const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create the schema
const planTourDetails = new Schema({
  useremail: {
    type: String,
    required: true,
  },
  locations: [
    {
      planTourName: {
        type: String,
        required: true,
      },
      tourStart: {
        tourStartLatitude: {
          type: String,
          required: true,
        },
        tourStartLongitude: {
          type: String,
          required: true,
        },
        tourStartLocationName: {
          type: String,
          required: true,
        },
      },
      tourEnd: {
        tourEndLatitude: {
          type: String,
          required: true,
        },
        tourEndLongitude: {
          type: String,
          required: true,
        },
        tourEndLocationName: {
          type: String,
          required: true,
        },
      },
      selectLocation: {
        tourselectLatitude: {
          type: String,
          required: true,
        },
        tourselectLongitude: {
          type: String,
          required: true,
        },
        tourselectLocationName: {
          type: String,
          required: true,
        },
      }
    },
  ],
});

const PlanTourDetails = mongoose.model("PlanTourDetails", planTourDetails);

module.exports = PlanTourDetails;
