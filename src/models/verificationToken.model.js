import mongoose from "mongoose";
const { Schema, model } = mongoose;

const verificationTokenSchema = Schema({
  managerId: { type: Schema.Types.ObjectId, ref: "Manager" },
  token: { type: Number, required: true },
  expiresIn: { type: Date, required: true },
});

const VerificationToken = model("VerificationToken", verificationTokenSchema);

export default VerificationToken;
