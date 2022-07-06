import mongoose from "mongoose";
const { Schema, model } = mongoose;

const workHoursSchema = Schema({
  pharmacyId: { type: Schema.Types.ObjectId, ref: "Pharmacy" },
  Days: {
    type: [
      {
        name: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        isOpen: { type: Boolean, required: true },
        startHour: { type: String, required: true },
        endHour: { type: String, required: true },
      },
    ],
    default: [
      {
        name: "Monday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Tuesday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Wednesday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Thursday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Friday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Saturday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
      {
        name: "Sunday",
        isOpen: false,
        startHour: 900,
        endHour: 1800,
      },
    ],
  },
});

const WorkHours = model("WorkHours", workHoursSchema);

export default WorkHours;
