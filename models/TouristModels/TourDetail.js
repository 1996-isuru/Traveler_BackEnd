const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//create the schema
const planTourDetails = new Schema({
  useremail: {
    type: String,
    required: true,
  },
  tours: [
    {
      planTourName: {
        type: String,
        required: true,
      },
      groupMembers: [String],
      tourStart: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
        tourStartLocationName: {
          type: String,
        },
      },
      tourEnd: {
        latitude: {
        },
        longitude: {
        },
        tourEndLocationName: {
          type: String,
        },
      },
      selectLocation: [
        {
          latitude: {
          },
          longitude: {
          },
          tourselectLocationName: {
            type: String,
          },
        },
      ],
    },
  ],
});

const PlanTourDetails = mongoose.model("PlanTourDetails", planTourDetails);

module.exports = PlanTourDetails;
