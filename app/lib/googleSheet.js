import * as google from "google-auth-library";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

const jwt = new google.JWT({
  email: process.env.CLIENT_EMAIL,
  key: process.env.API_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

export default jwt;
