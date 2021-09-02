const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");
// const checkAuth = require("../../../middleware/check_auth");

tourplanrouter.route("/plantourdetails").post((req, res) => {
    const planTourName = req.body.planTourName;
    const locationName = req.body.locations.locationName;
    const locationLatitude = req.body.locations.locationLatitude;
    const locationLongitude = req.body.locations.locationLongitude;
    const useremail = req.body.useremail;
  
    const newPlanTourDetails = new PlanTourDetails({
      useremail,
      planTourName,
      locationName,
      locationLatitude,
      locationLongitude
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