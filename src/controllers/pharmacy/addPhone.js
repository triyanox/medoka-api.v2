import { validatePhoneNumber } from "../../lib/validators.js";
import Pharmacy from "../../models/pharmacy.model.js";

export default async (req, res, next) => {
  try {
    const phoneNumber = Number(req.body.phoneNumber);
    const countryCode = req.body.countryCode;
    const id = req.params.id;

    const { error } = validatePhoneNumber(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    await Pharmacy.updateOne(
      { _id: id },
      {
        $set: {
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        },
      }
    ).catch((e) => {
      return res.status(400).json({
        error: "Pharmacy not found",
      });
    });
    return res.status(200).json({
      message: "Phone number updated successfuly ",
    });
  } catch (e) {
    next(e);
  }
};
