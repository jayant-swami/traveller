const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/userModel");

const tokenAuth = (req, res, next) => {
  let authentication = {
    status: "SUCCESS",
    user: {
      id: "",
      user_name: "",
      email: "",
      first_name: "",
      last_name: "",
      added_on: ""
    },
    error: {
      msg: ""
    }
  };
  jwt.verify(
    req.headers["x-auth-token"],
    config.jwt.jwtSecret,
    (err, decoded) => {
      if (err) {
        console.log(err);
        res
          .status(401)
          .send(
            "Token Error: Error occured while verifying token in token auth Middleware"
          );
      } else {
        userModel
          .findOne(
            { _id: decoded.id },
            "user_name email first_name last_name added_on"
          )
          .then(userVal => {
            if (userVal) {
              authentication.user = {
                id: userVal._id,
                user_name: userVal.user_name,
                email: userVal.email,
                first_name: userVal.first_name,
                last_name: userVal.last_name,
                added_on: userVal.added_on
              };
              req.authentication=authentication;
              next();
            } else {
              authentication.error.msg = "Unidentified User";
              authentication.status = "FAIL";
              req.authentication=authentication;
              next();
            }
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .send(
                "Server Error: Error occured while searching user in token authentication middleware"
              );
          });
      }
    }
  );
};

module.exports=tokenAuth;
