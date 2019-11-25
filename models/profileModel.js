const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true
  },
  user_name: { type: String, required: true, unique: true},
  first_name: { type: String },
  last_name: { type: String },
  bio: { type: String },
  dob: { type: Date },
  location: { type: String },
  social: { type: Object },
  places_travelled: [
    {
      title: { type: String },
      description: { type: String },
      place: { type: String },
      year: { type: Number },
      month: { type: String }
    }
  ],
  gender: {type: String}
});

module.exports = mongoose.model("profiles", profileSchema);
