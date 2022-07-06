import { validateEmail } from "../../lib/validators.js";
import Manager from "../../models/manager.model.js";
import VerificationToken from "../../models/verificationToken.model.js";
import { generateRandomNumber } from "../../lib/helpers.js";
import nodemailer from "nodemailer";
import { env } from "process";
import oAuth2Client from "../../lib/google.js";

export default async (req, res, next) => {
  try {
    const { error } = validateEmail(req.body.email);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    const { email } = req.body;
    const isExist = await Manager.exists({ email });
    if (isExist) {
      return res.status(400).json({
        error: "Email already exist",
      });
    }
    const manager = new Manager({ email: email });
    await manager.save();
    const code = generateRandomNumber(6);
    const token = new VerificationToken({
      token: code,
      managerId: manager._id,
      expiresIn: Date.now() + 10 * 60 * 1000,
    });
    await token.save();
    const accessToken = await oAuth2Client.getAccessToken().catch((err) => {});
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.MAIL_USERNAME,
        clientId: env.OAUTH_CLIENTID,
        clientSecret: env.OAUTH_CLIENT_SECRET,
        refreshToken: env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject: "Medoka - Verify your email",
      html: `
                <div>
                    <p>
                    Thanks for registering with Medoka.
                    </p>
                    <p>
                      Please use the following verification code to verify your email: <b>${code}</b>
                    </p>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      message: "Email sent",
      managerId: manager._id,
    });
  } catch (e) {
    next(e);
  }
};
