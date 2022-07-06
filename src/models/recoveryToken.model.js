import mongoose from "mongoose";
const { Schema, model } = mongoose;

const recoveryTokenSchema = Schema(
  {
    managerId: { type: Schema.Types.ObjectId, ref: "Manager" },
    token: { type: String, required: true },
    expiresIn: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const RecoveryToken = model("RecoveryToken", recoveryTokenSchema);

export default RecoveryToken;
