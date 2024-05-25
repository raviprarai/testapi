const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
    },
    title:{
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: Number,
    },
    password: {
        type: String,
      },
    isGraduate: {
        type: Boolean,
        default: true,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
