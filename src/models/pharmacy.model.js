import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pharmacySchema = Schema({
  managerId: { type: Schema.Types.ObjectId, ref: "Manager" },
  companyName: { type: String, required: true },
  serialNumber: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  adress: { type: String },
  countryCode: { type: String },
  phoneNumber: { type: String },
  avatar: { type: String },
  services: { type: Array },
  users: {
    type: [String],
    default: [],
  },
});

const Pharmacy = model("Pharmacy", pharmacySchema);

export default Pharmacy;
