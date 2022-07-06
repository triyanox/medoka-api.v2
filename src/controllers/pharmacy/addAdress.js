import { validateAdress } from "../../lib/validators.js";
import Pharmacy from "../../models/pharmacy.model.js";

export default async (req, res, next) => {
  try {
    const { adress } = req.body;
    const id = req.params.id;
    const { error } = validateAdress(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    await Pharmacy.updateOne(
      { _id: id },
      {
        $set: {
          adress: adress,
        },
      }
    ).catch((e) => {
      return res.status(400).json({
        error: "Pharmacy not found",
      });
    });
    return res.status(200).json({
      message: "Adress updated successfuly ",
    });
  } catch (e) {
    next(e);
  }
};
