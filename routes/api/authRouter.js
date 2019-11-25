const router=require("express").Router();
const tokenAuth=require("../../middleware/tokenAuth");


router.get("/",tokenAuth, (req,res)=>{  
        res.send(req.authentication)
});

module.exports= router;