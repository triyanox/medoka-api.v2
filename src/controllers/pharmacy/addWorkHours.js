import WorkHours from "../../models/workHours.model.js";

/**
 * @note 
 * The way work days are stored in the database is as follows:
 * @example
 * [
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
    ]
* the startHour and endHour are strings in the format HH:MM 
* and stored in the database like this HHMM
* so you will need a function on the front-end to format and reformat these two values
* before hitting the server
* @example
* function fromatWH(startHour){
*    return startHour.split(":").join("");  // returns a string in the format HHMM
* }
*/

export default async (req, res, next) => {
  try {
    const id = req.params.id;
    const days = req.body.days;
    const isExists = await WorkHours.exists({ pharmacyId: id });

    if (!isExists) {
      const workHours = new WorkHours({
        pharmacyId: id,
        workHours: days,
      });
      await workHours.save();
      return res.status(200).json({
        message: "Business hours added successfuly ",
      });
    }

    await WorkHours.updateOne(
      { _id: id },
      {
        $set: {
          days: days,
        },
      }
    );

    return res.status(200).json({
      message: "Business hours updated successfuly ",
    });
  } catch (e) {
    next(e);
  }
};
