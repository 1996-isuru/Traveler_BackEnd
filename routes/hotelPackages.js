const router = require("express").Router();
const hotelPackage = require("../models/hotelPackage");
let Users = require("../models/hotelPackage");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const facilities = req.body.facilities;
  const picture = req.body.picture;

  const newHotelPackage = new hotelPackage({
    name,
    description,
    price,
    facilities,
    picture,
  });

  newHotelPackage
    .save()
    .then(() => {
      res.json("Package Added");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/").get((req, res) => {
  hotelPackage
    .find()
    .then((hotelPackages) => {
      res.json(hotelPackages);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let packageId = req.params.id;
  const { name, description, price, facilities, picture } = req.body;

  const updateHotelPackage = {
    name,
    description,
    price,
    facilities,
    picture,
  };
  const update = await hotelPackage
    .findByIdAndUpdate(packageId, updateHotelPackage)
    .then(() => {
      res.status(200).send({ status: "Package Updated" });
    })
    .catch.log(err);
  console.log(err);
  res.status(500).send({ status: "Error with updating Data" });
});

router.route("/delete/:id").delete(async (req, res) => {
  let packageId = req.params.id;
  await hotelPackage
    .findByIdAndDelete(packageId)
    .then(() => {
      res.status(200).send({ status: "Package Deleted" });
    })
    .catch.log(err);
  console.log(err.message);
  res.status(500).send({ status: "Error with delete Data" });
});

router.route("/get/:id").get(async (req, res) => {
  let packageId = req.params.id;
  const user = await hotelPackage
    .findById(packageId)
    .then((hotelPackage) => {
      res.status(200).send({ status: "Package Fetched", hotelPackage });
    })
    .catch.log(err);
  console.log(err.message);
  res.status(500).send({ status: "Error with get Data", error: err.message });
});

//get all packages for tourist home
router.route("/getpackages").post((req, res) => {
  Users.find()
    .exec()
    .then((result) => {
      console.log(result);
      return res.status(409).json({
        message: "get hotel packgaes",
        data: result,
      });
    });
});

module.exports = router;
