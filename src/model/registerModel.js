const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator")
require("dotenv").config({ path: "config.env" });
const secret_key = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    min:10
  },
  gmail: {
    type: String,
    required: true,
    unique: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email data")
        }
    }
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
  

userSchema.methods.generateAuthToken = async function () {
  try {
    const genToken = jwt.sign({ _id: this._id.toString() }, secret_key, {
      expiresIn: "60m",
    });
    this.tokens = this.tokens.concat({ token: genToken });
    // console.log(this.tokens);
    // await this.save();
    return genToken;
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

// Create Collections.
const userModel = new mongoose.model("authUser", userSchema);

module.exports = userModel;
