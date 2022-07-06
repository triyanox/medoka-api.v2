import Manager from "../../models/manager.model.js";
import RecoveryToken from "../../models/recoveryToken.model.js";
import { env } from "process";
import { generateRandomString } from "../../lib/helpers.js";
import { validateEmail } from "../../lib/validators.js";
import nodemailer from "nodemailer";

export default async (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = validateEmail(req.body.email);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    const isExist = await Manager.findOne({ email: email });
    if (!isExist) {
      return res.status(400).json({
        error: "Account does not exist",
      });
    }
    await RecoveryToken.deleteMany({
      managerId: isExist._id,
    });
    const RandomString = generateRandomString(6);
    // this page can be dynamically generated on the client and contain
    // a form to submit the new password to /api/recover/:token
    // where the token is the same RandomString
    let url = `${env.FRONTEND_URL}/recover/${RandomString}`;

    const rToken = new RecoveryToken({
      managerId: isExist._id,
      token: RandomString,
      expiresIn: Date.now() + 10 * 60 * 1000,
    });
    await rToken.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: env.MAIL_USERNAME,
        clientId: env.OAUTH_CLIENTID,
        clientSecret: env.OAUTH_CLIENT_SECRET,
        refreshToken: env.OAUTH_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: env.EMAIL_FROM,
      to: email,
      subject: "Medoka - Recover your account",
      html: `
                <div>
                    <p>
                    You have requested to recover your account.
                    </p>
                    <p>
                      Please use the following link to recover your account: 
                      <a href="${url}">Recover your account</a>
                    </p>
                </div>
            `,
    };

    transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Recovery link sent",
    });
  } catch (e) {
    next(e);
  }
};
