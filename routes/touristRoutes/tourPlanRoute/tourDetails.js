const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");
// const checkAuth = require("../../../middleware/check_auth");

tourplanrouter.route("/plantourdetails").post((req, res) => {
  const planTourName = req.body.tours[0].planTourName;
  const useremail = req.body.useremail;
  const tourStartLocationName =
    req.body.tours[0].tourStart.tourStartLocationName;
  const tourStartLatitude = req.body.tours[0].tourStart.tourStartLatitude;
  const tourStartLongitude = req.body.tours[0].tourStart.tourStartLongitude;
  const tourEndLatitude = req.body.tours[0].tourEnd.tourEndLatitude;
  const tourEndLongitude = req.body.tours[0].tourEnd.tourEndLongitude;
  const tourEndLocationName = req.body.tours[0].tourEnd.tourEndLocationName;
  const tourselectLatitude =
    req.body.tours[0].selectLocation[0].tourselectLatitude;
  const tourselectLongitude =
    req.body.tours[0].selectLocation[0].tourselectLongitude;
  const tourselectLocationName =
    req.body.tours[0].selectLocation[0].tourselectLocationName;

  const groupMembers = req.body.tours[0].groupMembers[0];
  const newPlanTourDetails = new PlanTourDetails({
    useremail,
    tours: [
      {
        planTourName,
        groupMembers: [groupMembers],
        tourStart: {
          tourStartLatitude,
          tourStartLongitude,
          tourStartLocationName,
        },
        tourEnd: {
          tourEndLatitude,
          tourEndLongitude,
          tourEndLocationName,
        },
        selectLocation: [
          {
            tourselectLatitude,
            tourselectLongitude,
            tourselectLocationName,
          },
        ],
      },
    ],
  });
  newPlanTourDetails
    .save()
    .then(() => {
      res.json("TOur plan added");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with update data." });
    });
});

module.exports = tourplanrouter;
