const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");
// const checkAuth = require("../../../middleware/check_auth");

tourplanrouter.route("/plantourdetails").post((req, res) => {
    const planTourName = req.body.locations[0].planTourName;
    const useremail = req.body.useremail;
    const tourStartLocationName = req.body.locations[0].tourStart.tourStartLocationName;
    const tourStartLatitude = req.body.locations[0].tourStart.tourStartLatitude;
    const tourStartLongitude = req.body.locations[0].tourStart.tourStartLongitude;
    const tourEndLatitude = req.body.locations[0].tourEnd.tourEndLatitude;
    const tourEndLongitude = req.body.locations[0].tourEnd.tourEndLongitude;
    const tourEndLocationName = req.body.locations[0].tourEnd.tourEndLocationName;
    const tourselectLatitude = req.body.locations[0].selectLocation.tourselectLatitude;
    const tourselectLongitude = req.body.locations[0].selectLocation.tourselectLongitude;
    const tourselectLocationName = req.body.locations[0].selectLocation.tourselectLocationName;
    
  console.log(tourStartLatitude)
    const newPlanTourDetails = new PlanTourDetails({
      useremail,
      locations: [
          {
            planTourName,
            tourStart: {
                tourStartLatitude,
                tourStartLongitude,
                tourStartLocationName
            },
            tourEnd: {
                tourEndLatitude,
                tourEndLongitude,
                tourEndLocationName
            },
            selectLocation: {
                tourselectLatitude,
                tourselectLongitude,
                tourselectLocationName
            }

          }
      ]
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