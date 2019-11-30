const postModel=require("../models/postModel");

const postValidation = (req, res, next) => {

  // console.log("postValitation Middleware")
  // console.log(req.body);

  let validation = {
    status: "SUCCESS",
    error: {
      title: "",
      content: ""
    }
  };
// console.log(req.body);

  // Title Validation
  if (!req.body.title) {
    validation.status = "FAIL";
    validation.error.title = "Title is Required";
  }

  // Content Validation
  if (!req.body.content) {
    validation.status = "FAIL";
    validation.error.content = "Content is Required";
  }


  postModel.findOne({user_id:req.authentication.user.id, title: req.body.title}).then((val)=>{
      if(val){
        //   console.log(val);
          validation.status="FAIL";
          validation.error.title="Title already being used";
          req.validation=validation;
          next();
      }
      else{
          req.validation=validation;
          next();
      }
  }).catch(err=>{
      console.log(err);
      res.status(400).send("Error: An error occured in post validation middleware");
  })

};

module.exports=postValidation;
