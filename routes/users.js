const bcrypt = require("bcrypt");

const router = require("express").Router();
let Users = require("../models/User");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check_auth');

router.route("/signup", checkAuth).post((req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new Users({
              userName: req.body.userName,
              email: req.body.email,
              type: req.body.checked,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.route("/login").post (async (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth faild",
        });
      } 
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return re.status(404).json({
              message: "Auth faild",
            });
          }
          if (result) {

            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            }, `{process.env.JWT_KEY}`, 
            {
              expiresIn: "1h"
            })
            return res.status(200).json({
              token: token,
              message: "Auth successful",
              userName: user[0].userName,
              userType: user[0].type,
              userEmail: user[0].email,
            });
          }
          return res.status(404).json({
            message: "Auth faild",
          });
        }); 
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.route("/getstarted").put(async (req, res) => {
  
  const email = req.body.email;
  const filter = { email: email };
  console.log(email);
  const living = req.body.living;
  const bio = req.body.bio;
  const profilePic = req.body.profilePic;
  const user =  {
    living,
    bio,
    profilePic,
  };
  console.log(user);
  const update = await Users.findOneAndUpdate(filter, user)
    .then(() => {
      res.status(200).send({ status: "User Updated." });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with update data.", error: err.message });
    });
});


module.exports = router;
