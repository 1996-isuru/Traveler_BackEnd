const tourplanrouter = require("express").Router();
let PlanTourDetails = require("../../../models/TouristModels/TourDetail");

tourplanrouter.route("/checktour").post((req, res) => {
  let useremail = req.body.userEmail;
  PlanTourDetails.find({ useremail: req.body.userEmail })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        // console.log(user);
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
  newPlanTourDetails
    .save()
    .then((result) => {
      console.log(result);
      console.log(result.tours[result.tours.length - 1]._id);
      let tourid = result.tours[result.tours.length - 1]._id;
      let tourprofileid = result._id;
      res.json({
        tourprofileid: tourprofileid,
        tourid: tourid,
        message: "Tour Name exists",
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with update data." });
    });
});

tourplanrouter.route("/addtour").post((req, res) => {
  // console.log("addtour router");
  let planTourName = req.body.tourName;
  // console.log(planTourName);
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
      // console.log(user);
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Tour Name exists",
        });
      } else {
        // console.log("aaaaaaaaa");
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
          },
          { new: true }
        )
          .exec()
          .then((result) => {
            // console.log(result.tours.length);
            // console.log(result);
            // console.log(result.tours[result.tours.length - 1]._id);
            let tourprofileid = result._id;
            res.status(201).json({
              message: "Tour created",
              tourid: result.tours[result.tours.length - 1]._id,
              tourprofileid: tourprofileid,
            });
          });
      }
    });
});

// add new location
tourplanrouter.route("/addnewlocation").post((req, res) => {
  // console.log("add place");
  let tourId = req.body.tourId;
  let tourprofileid = req.body.tourprofileid;
  let planTourName = req.body.tourName;
  console.log(planTourName);
  // console.log(tourprofileid);
  let useremail = req.body.userEmail;
  // console.log(tourId);
  let tourselectLocationName = req.body.selectLocationName;
  let tourselectLatitude = req.body.selectLocationLatitude;
  let tourselectLongitude = req.body.selectLocationLongitude;

  PlanTourDetails.updateOne(
    {
      _id: tourprofileid,
      "tours._id": tourId,
    },
    {
      $push: {
        "tours.$.selectLocation": {
          tourselectLatitude: tourselectLatitude,
          tourselectLongitude: tourselectLongitude,
          tourselectLocationName: tourselectLocationName,
        },
      },
    },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Location added",
      });
    });
});

//get trip list
tourplanrouter.route("/showtourlist").post((req, res) => {
  // console.log("showtourlist router");
  let useremail = req.body.userEmail;
  // console.log(useremail);

  const query = {};
  const projection = { useremail: useremail };

  PlanTourDetails.find(projection)
    .exec()
    .then((result) => {
      // console.log("kkkkkk");
      if (result.length >= 1) {
        result.forEach((result) => {
          // console.log(result);
          return res.status(409).json({
            message: result,
          });
        });
      } else {
        // console.log("sssss");
        return res.status(409).json({
          message: "No created tours",
        });
      }
    });
});

// get location details for render map view
tourplanrouter.route("/rendermap").post((req, res) => {
  console.log("get location details for render map view");
  let tourId = req.body.tourId;
  let tourprofileid = req.body.tourprofileid;

  PlanTourDetails.findById(
    { _id: tourprofileid, "tours._id": tourId },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        let resultt = result.tours.filter((obj) => {
          return obj._id == tourId;
        });
        return res.status(409).json({
          message: "get_map_details",
          tourStart: resultt[0].tourStart,
          tourEnd: resultt[0].tourEnd,
          selectLocation: resultt[0].selectLocation,
        });
      }
    }
  );
});

module.exports = tourplanrouter;
