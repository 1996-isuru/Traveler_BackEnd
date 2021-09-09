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
        tourStartLatitude: {
          type: String,
        },
        tourStartLongitude: {
          type: String,
        },
        tourStartLocationName: {
          type: String,
        },
      },
      tourEnd: {
        tourEndLatitude: {
          type: String,
        },
        tourEndLongitude: {
          type: String,
        },
        tourEndLocationName: {
          type: String,
        },
      },
      selectLocation: [
        {
          tourselectLatitude: {
            type: String,
          },
          tourselectLongitude: {
            type: String,
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
