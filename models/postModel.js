const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  title: {type: String, required:true},
  content: { type: String, required: true },
  media: {type: Object, default: { name: "", type: "", size: "", secure_url: "" }},
  likes: [{ type: String, required:true}],
  comments: [
      {
          user_id: {type: mongoose.Schema.Types.ObjectId, ref:"users", required: true},
          comment: {type: String, required:true},
          commented_on: {type: Date, required:true, default: Date.now()},
          is_deleted: {type: Boolean, default:false}
      }
  ],
  posted_on: {type: Date, default:Date.now(), required:true},
  is_deleted: {type:Boolean, default:false}
})

postSchema.index({user_id: 1, title: 1}, {unique: true});


module.exports= mongoose.model("posts",postSchema);
