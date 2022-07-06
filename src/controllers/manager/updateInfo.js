import { validateManagerInfos } from "../../lib/validators.js";
import Manager from "../../models/manager.model.js";

/**
 * @note requires auth
 */
export default async (req, res, next) => {
  try {
    let { countryCode, gender, firstName, lastName, phoneNumber } = req.body;
    const { error } = validateManagerInfos(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    await Manager.updateOne(
      {
        _id: req.manager._id,
      },
      {
        gender,
        firstName,
        lastName,
        countryCode,
        phoneNumber,
      }
    );
    return res.status(200).json({
      message: "Manager info updated",
    });
  } catch (e) {
    next(e);
  }
};
