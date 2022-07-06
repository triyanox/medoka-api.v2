import Manager from "../../models/manager.model.js";
import VerificationToken from "../../models/verificationToken.model.js";
import { env } from "process";
import { validateToken } from "../../lib/validators.js";
import cookie from "cookie";

export default async (req, res, next) => {
  try {
    const token = req.body.token;
    const { managerId } = req.params;

    const { error } = validateToken(token);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const vToken = await VerificationToken.findOne({
      managerId: managerId,
      token: token,
    });
    if (!vToken) {
      return res.status(400).json({
        error: "Invalid verification code",
      });
    }
    const now = new Date().getTime();
    if (now - vToken.expiresAt < 10 * 60 * 1000) {
      await vToken.delete();
      return res.status(400).json({
        error: "Expired token !",
      });
    }

    const manager = await Manager.findOneAndUpdate(
      {
        _id: managerId,
      },
      {
        $set: {
          verified: true,
        },
      }
    );
    await vToken.delete();
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
        message: "Email verified",
      });
  } catch (e) {
    next(e);
  }
};
