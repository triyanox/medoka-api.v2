import { validateCredentials } from "../../lib/validators.js";
import * as bcrypt from "bcrypt";
import cookie from "cookie";
import Manager from "../../models/manager.model.js";
import { env } from "process";

export default async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const { error } = validateCredentials(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const manager = await Manager.findOne({
      email: email,
      verified: true,
      initialized: true,
    });
    if (!manager) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    const isMatch = bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const jwtToken = manager.generateAuthToken();
    return res
      .append(
        "Set-Cookie",
        cookie.serialize("token", jwtToken, {
          httpOnly: true,
          secure: env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
        })
      )
      .status(200)
      .json({
        message: "Successfully logged in",
      });
  } catch (e) {
    next(e);
  }
};
