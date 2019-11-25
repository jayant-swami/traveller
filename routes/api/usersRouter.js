const router = require("express").Router();
const userValidation = require("../../middleware/userValidation");
const userModel = require("../../models/userModel");
const profileModel = require("../../models/profileModel");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../../middleware/tokenAuth");
const mongoose=require("mongoose");

// Register a user
router.post("/register", userValidation, (req, res) => {
  if (req.validation.status === "SUCCESS") {
    let newUser = userModel({
      _id: new mongoose.Types.ObjectId(),
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password,
      added_on: Date.now(),
      first_name: req.body.first_name,
      last_name: req.body.last_name
    });

    bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) {
        console.log(err);
        res.status(500).send("An error has occured while hashing");
      } else {
        newUser.password = hash;
        newUser
          .save()
          .then(newUserVal => {
            console.log(newUserVal);
            let newProfile = profileModel({
              user_id: newUserVal._id,
              user_name: newUserVal.user_name,
              first_name: newUserVal.first_name,
              last_name: newUserVal.last_name,
              bio: "",
              dob: "",
              location: "",
              social: [],
              places_travelled: [],
              gender: ""
            });

            newProfile
              .save()
              .then(newProfileVal => {
                console.log(newProfileVal);
                res.send(req.validation);
              })
              .catch(err => {
                console.log(err);
                res.send("Error: An Error has Occured while creating Profile");
              });
          })
          .catch(err => {
            console.log(err);
            res.send("Error: An Error has Occured while creating User");
          });
      }
    });
  } else {
    res.send(req.validation);
  }
});

// Login a user
router.post("/login", (req, res) => {
  let response = {
    status: "SUCCESS",
    token: "",
    user: {
      user_name: req.body.user_name,
      email: "",
      first_name: "",
      last_name: "",
      added_on: ""
    },
    error: {
      user_name: "",
      password: ""
    }
  };

  if (!req.body.user_name) {
    response.error.user_name = "User Name is required";
    response.status = "FAIL";
  }
  if (!req.body.password) {
    response.error.password = "Password is required";
    response.status = "FAIL";
  }

  if (response.status === "SUCCESS") {
    userModel
      .findOne(
        { user_name: req.body.user_name },
        "email first_name last_name password avatar"
      )
      .then(val => {
        if (val) {
          console.log(val);
          bcrypt
            .compare(req.body.password, val.password)
            .then(value => {
              console.log("value");
              if (value) {
                // sign jwt token
                jwt.sign(
                  { id: val.id },
                  config.jwt.jwtSecret,
                  (err, tokenVal) => {
                    if (err) {
                      res
                        .status(500)
                        .send(
                          "Server Error: Error Occured while signing token"
                        );
                    } else {
                      (response.token = tokenVal),
                        (response.user.email = val.email),
                        (response.user.first_name = val.first_name),
                        (response.user.last_name = val.last_name),
                        (response.user.added_on = val.added_on),
                        (response.user.avatar = val.avatar);
                      res.send(response);
                    }
                  }
                );
              } else {
                response.error.password = "Incorrect Password";
                response.status = "FAIL";
                res.send(response);
              }
            })
            .catch(err => {
              console.log(err);
              res
                .status(500)
                .send("Server Error: Error Occured while comparing pass");
            });
        } else {
          response.error.user_name = "User not registered";
          response.status = "FAIL";
          res.send(response);
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .send("Server Error: An error occured while user search");
      });
  }
});

// List Users
router.get("/", (req, res) => {
  userModel
    .find({}, "user_name first_name last_name added_on -_id")
    .then(usersVal => {
      res.send(usersVal);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Error: An error occured while getting user list");
    });
});

module.exports = router;
