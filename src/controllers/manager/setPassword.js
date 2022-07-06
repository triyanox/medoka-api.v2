import { validatePassword } from "../../lib/validators.js";
import * as bcrypt from "bcrypt";
import RecoveryToken from "../../models/recoveryToken.model.js";
import Manager from "../../models/manager.model.js";

export default async (req, res, next) => {
  try {
    const { password } = req.body;
    const { error } = validatePassword(req.body.password);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const rToken = await RecoveryToken.findOne({
      token: req.params.token,
    });
    if (!rToken) {
      return res.status(404).json({
        error: "Access denied, invalid token",
      });
    }
    const now = new Date().getTime();

    if (now - rToken.expiresAt < 10 * 60 * 1000) {
      await rToken.delete();
      return res.status(400).json({
        error: "This url has been expired",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await Manager.updateOne(
      {
        _id: rToken.managerId,
      },
      {
        $set: { password: hashedPassword, initialized: true },
      }
    );
    await rToken.delete();

    return res.status(200).json({ message: "Password updated" });
  } catch (e) {
    next(e);
  }
};
