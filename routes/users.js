const bcrypt = require("bcrypt");

const router = require("express").Router();
let Users = require("../models/User");

router.route("/signup").post((req, res) => {
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
            return res.status(404).json({
              message: "Auth faild",
            });
          }
          if (result) {
            return res.status(200).json({
              message: "Auth successful",
              userName: user[0].userName,
              userType: user[0].type,
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


module.exports = router;
