import { validateEmail } from "../../lib/validators.js";
import Pharmacy from "../../models/pharmacy.model.js";
import Manager from "../../models/manager.model.js";

export default async (req, res, next) => {
  try {
    const { email } = req.body;
    const id = req.params.id;

    const { error } = validateEmail(email);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const isExist = await Manager.exists({ email: email });
    if (!isExist) {
      return res.status(404).json({
        error: "This user does not exist",
      });
    }
    const pharamacy = await Pharmacy.findById(id);

    if (!pharamacy) {
      return res.status(404).json({
        error: "Pharamacy not found",
      });
    }

    if (pharamacy.users.includes(email)) {
      return res.status(400).json({
        error: "This user already added",
      });
    }

    pharamacy.users.push(email);
    await pharamacy.save();

    return res.status(200).json({
      message: "User added successfuly ",
    });
  } catch (e) {
    next(e);
  }
};
