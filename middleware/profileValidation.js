
const profileValidation = (req, res, next) => {
  let validation = {
    status: "SUCCESS",
    error: {
        bio: "",
        dob: "",
        location: "",
        social: "",
        places_travelled: ""
    }
  };

  next();

};

module.exports = userValidation;
