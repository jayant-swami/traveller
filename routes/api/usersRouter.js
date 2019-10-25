const router = require("express").Router();
const userValidation = require("../../middleware/userValidation");
const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const config = require("../../config/config");
const jwt = require("jsonwebtoken");
const tokenAuth= require("../../middleware/tokenAuth");

router.post("/register", userValidation, (req, res) => {
  if (req.validation.status === "SUCCESS") {
    let newUser = userModel({
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
          .then(val => {
            console.log(val);
            res.send(req.validation);
          })
          .catch(err => {
            console.log(err);
            res.send("An Error has Occured");
          });
      }
    });
  } else {
    res.send(req.validation);
  }
});

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
        "email first_name last_name password"
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
                        (response.user.added_on = val.added_on);
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
          res.send(response)
        }
      })
      .catch((err)=> {
          console.log(err);
          res.status(500).send("Server Error: An error occured while user search")
      });
  }
});

router.get("/", tokenAuth,(req,res)=>{
    res.send(req.authentication);
})

module.exports = router;
