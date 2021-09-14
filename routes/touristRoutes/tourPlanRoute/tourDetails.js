const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");

tourplanrouter.route("/checktour").post((req, res) => {
  let useremail = req.body.userEmail;
  PlanTourDetails.find({ useremail: req.body.userEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Already Created",
        });
      } else {
        return res.status(409).json({
          message: "Already not Created",
        });
      }
    });
});

tourplanrouter.route("/plantourdetails").post((req, res) => {
  let planTourName = req.body.tourName;
  console.log(planTourName);
  let useremail = req.body.userEmail;
  let tourStartLocationName = req.body.startLocationName;
  let tourStartLatitude = req.body.startLocationLatitude;
  let tourStartLongitude = req.body.startLocationLongitude;
  let tourEndLatitude = req.body.endLocationName;
  let tourEndLongitude = req.body.endLocationLatitude;
  let tourEndLocationName = req.body.endLocationLongitude;

  let newPlanTourDetails = new PlanTourDetails({
    useremail,
    tours: [
      {
        planTourName,
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
      },
    ],
  });
  PlanTourDetails.find({ useremail: req.body.userEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
      } else {
        newPlanTourDetails
          .save()
          .then(() => {
            res.json("Tour plan added");
          })
          .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with update data." });
          });
      }
    });
});

tourplanrouter.route("/addtour").post((req, res) => {
  console.log("addtour router");
  let planTourName = req.body.tourName;
  console.log(planTourName);
  let useremail = req.body.userEmail;
  let tourStartLocationName = req.body.startLocationName;
  let tourStartLatitude = req.body.startLocationLatitude;
  let tourStartLongitude = req.body.startLocationLongitude;
  let tourEndLatitude = req.body.endLocationName;
  let tourEndLongitude = req.body.endLocationLatitude;
  let tourEndLocationName = req.body.endLocationLongitude;

  const query = { useremail: useremail };
  const projection = { "tours.planTourName": planTourName };

  PlanTourDetails.find(projection, query)
    .exec()
    .then((user) => {
      console.log("kkkkkk");
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Tour Name exists",
        });
      } else {
        console.log("aaaaaaaaa");
        PlanTourDetails.findOneAndUpdate(
          { useremail: req.body.userEmail },
          {
            $push: {
              tours: {
                planTourName,
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
              },
            },
          }
        )
          .exec()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: "Tour created",
            });
          });
      }
    });
});

// add new location
tourplanrouter.route("/addnewlocation").post((req, res) => {
  console.log("add place");
  let planTourName = req.body.tourName;
  console.log(planTourName);

  let useremail = req.body.userEmail;
  console.log(useremail);
  let tourselectLocationName = req.body.selectLocationName;
  let tourselectLatitude = req.body.selectLocationLatitude;
  let tourselectLongitude = req.body.selectLocationLongitude;

  PlanTourDetails.findOneAndUpdate(
    { planTourName: planTourName },
    {
      $push: {
        "tours.$.selectLocation": {
          tourselectLatitude: tourselectLatitude,
          tourselectLongitude: tourselectLongitude,
          tourselectLocationName: tourselectLocationName,
        },
      },
    }
  )
    .exec()
    .then((result) => {
      console.log("lllllllll");
      console.log(result);
      res.status(201).json({
        message: "Tour created",
      });
    });
});

module.exports = tourplanrouter;
