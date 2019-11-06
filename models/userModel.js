const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const userSchema=new Schema({
    _id: Schema.Types.ObjectId,
    user_name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    added_on: {type: String, default: Date.now()},
    first_name: {type: String, default: "User"},
    last_name: {type: String}    
});

module.exports= mongoose.model("users", userSchema);