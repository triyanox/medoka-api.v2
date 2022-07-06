import { validatePassword } from "../../lib/validators.js";
import * as bcrypt from "bcrypt";
import Manager from "../../models/manager.model.js";

/**
 * @note requires auth
 */
export default async (req, res, next) => {
  try {
    const { password } = req.body;

    const { error } = validatePassword(req.body.password);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await Manager.updateOne(
      {
        _id: req.manager._id,
      },
      {
        $set: {
          initialized: true,
          password: hashedPassword,
        },
      }
    );

    return res.status(200).json({
      message: "Password updated",
    });
  } catch (e) {
    next(e);
  }
};
