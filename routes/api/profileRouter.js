const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const profileModel = require("../../models/profileModel");

// View logged in user's profile
router.get("/me", tokenAuth, (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    profileModel
      .findOne({ user_name: req.authentication.user.user_name })
      .then(userVal => {
        if (userVal) {
          req.authentication.userProfile = userVal;
          res.send(req.authentication);
        } else {
          throw Error("User does not exist");
        }
      })
      .catch(err => {
        console.log(err);
        res.send("Error: An error occured while getting profile data");
      });
  } else {
    res.send(req.authentication.userProfile);
  }
});

// Update logged in user's profile
router.put("/me", tokenAuth, (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    profileModel
      .findOneAndUpdate(
        { user_id: req.authentication.user.id },
        {
          bio: req.body.bio,
          dob: req.body.dob,
          location: req.body.location,
          social: req.body.social,
          places_travelled: req.body.places_travelled,
          gender: req.body.gender
        },
        { new: true }
      )
      .then(userVal => {
        // console.log(userVal);
        if (userVal) {
          req.authentication.userProfile = userVal;
          res.send(req.authentication);
        } else {
          throw Error(
            "Error Occured while updating profile. Profile not created"
          );
        }
      })
      .catch(err => {
        console.log(err);
        res.send("Error: Error occured while updating profile");
      });
  }
});

// View other user's profile
router.get("/:user_name", tokenAuth, (req, res) => {
  profileModel
    .findOne({ user_name: req.params.user_name })
    .then(profileVal => {
      if (profileVal) {
        req.authentication.userProfile = profileVal;
        res.send(req.authentication);
      } else {
        throw Error(
          "Error Occured while getting profile. Profile not created"
        );
      }
    })
    .catch(err => {
      console.log(err);
      res.send("Error: Error occured while getting profile");
    });
});

module.exports = router;
