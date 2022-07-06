import mongoose from "mongoose";
const { Schema, model } = mongoose;
import jwt from "jsonwebtoken";
import { env } from "process";

const managerSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  initialized: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  countryCode: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    default: 0,
  },
});

/**
 * @usage
 * generate jwt token for session management
 **/
managerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    env.JWT_SECRET
  );
  return token;
};

const Manager = model("Manager", managerSchema);

export default Manager;
