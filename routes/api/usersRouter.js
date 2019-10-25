const router = require("express").Router();
const userValidation = require("../../middleware/userValidation");
const userModel = require("../../models/userModel");
const bcrypt= require("bcrypt");

router.post("/", userValidation, (req, res) => {
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

module.exports = router;
