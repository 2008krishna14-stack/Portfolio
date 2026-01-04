const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },



    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    messageSubject: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 80,
    },
    message: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 800,
    },



  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
