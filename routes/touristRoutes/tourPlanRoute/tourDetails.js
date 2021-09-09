const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");

tourplanrouter.route("/plantourdetails").post((req, res) => {
  let planTourName = req.body.tours[0].tourName;
  let useremail = req.body.userEmail;
  let tourStartLocationName =
    req.body.tours[0].tourStart.tourStartLocationName;
  let tourStartLatitude = req.body.tours[0].tourStart.tourStartLatitude;
  let tourStartLongitude = req.body.tours[0].tourStart.tourStartLongitude;
  let tourEndLatitude = req.body.tours[0].tourEnd.tourEndLatitude;
  let tourEndLongitude = req.body.tours[0].tourEnd.tourEndLongitude;
  let tourEndLocationName = req.body.tours[0].tourEnd.tourEndLocationName;
  let tourselectLatitude =
    req.body.tours[0].selectLocation[0].tourselectLatitude;
  let tourselectLongitude =
    req.body.tours[0].selectLocation[0].tourselectLongitude;
  let tourselectLocationName =
    req.body.tours[0].selectLocation[0].tourselectLocationName;

  let groupMembers = req.body.tours[0].groupMembers[0];
  let newPlanTourDetails = new PlanTourDetails({
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
