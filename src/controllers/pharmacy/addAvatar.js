import Pharmacy from "../../models/pharmacy.model.js";
import { validateAvatar } from "../../lib/validators.js";

export default async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const id = req.params.id;
    const { error } = validateAvatar(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    await Pharmacy.updateOne(
      { _id: id },
      {
        $set: {
          avatar: avatar,
        },
      }
    ).catch((e) => {
      return res.status(400).json({
        error: "Pharmacy not found",
      });
    });
    return res.status(200).json({
      message: "Avatar updated successfuly ",
    });
  } catch (e) {
    next(e);
  }
};
