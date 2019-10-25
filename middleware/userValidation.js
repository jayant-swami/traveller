const userModel = require("../models/userModel");

const userValidation = (req, res, next) => {
  let validation = {
    status: "SUCCESS",
    user_name: "",
    email: "",
    password: "",
    first_name: "",
    last_name: ""
  };

  // Check User Name
  const userNameRegex = /^[a-z0-9_-]{3,16}$/;
  if (!userNameRegex.test(req.body.user_name)) {
    validation.user_name =
      "User Name must be 3 to 16 characters long. Only lowercase alphanumeric, underscores(_) and hyphens(-) are allowed";
    validation.status = "FAIL";
  }

  // Check Email
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(String(req.body.email).toLowerCase())) {
    validation.email = "Email is not valid";
    validation.status = "FAIL";
  }

  //   Check Password
  const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    validation.password =
      "Password should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long";
    validation.status = "FAIL";
  }

  const firstNameRegexp = /^[a-zA-Z]{2,30}$/;
  if (req.body.first_name && !firstNameRegexp.test(req.body.first_name)) {
    validation.first_name = "Only alphabets are allowed. Length: 2 to 30";
    validation.status = "FAIL";
  }

  const lastNameRegexp = /^[a-zA-Z]{1,30}$/;
  if (req.body.last_name && !lastNameRegexp.test(req.body.last_name)) {
    validation.last_name = "Only alphabets are allowed. Length: 1 to 30";
    validation.status = "FAIL";
  }

  //Check if user_name already exists
  let userPromise = userModel
    .findOne({ user_name: req.body.user_name })
    .then(val => {
      let outVal = 0;
      if (val) {
        outVal = 1;
      }
      return new Promise((resolve, reject) => {
        resolve(outVal);
      });
    });

  //Check if email already exists
  let emailPromise = userModel.findOne({ email: req.body.email }).then(val => {
    let outVal = 0;
    if (val) {
      outVal = 1;
    }
    return new Promise((resolve, reject) => {
      resolve(outVal);
    });
  });

  Promise.all([userPromise, emailPromise])
    .then(vals => {
      if (vals[0] === 1) {
        validation.user_name = "User already registered";
        validation.status = "FAIL";
      }
      if (vals[1] === 1) {
        validation.email = "Email already registered";
        validation.status = "FAIL";
      }

      if (validation.status === "SUCCESS") {
        req.validation = validation;
        next();
      } else {
        req.validation = validation;
        next();
      }
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = userValidation;
