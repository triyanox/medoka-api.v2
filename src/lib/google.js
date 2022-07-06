import { env } from "process";
import { google } from "googleapis";

const CLIENT_ID = env.OAUTH_CLIENTID;
const CLIENT_SECRET = env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = env.OAUTH_REDIRECT_URI;
const REFRESH_TOKEN = env.OAUTH_REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

export default oAuth2Client;
