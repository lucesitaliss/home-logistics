// import { google } from "googleapis";
// import dotenv from "dotenv";

// dotenv.config();

// const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// async function getNewToken() {
//   const client_id = process.env.GOOGLE_CLIENT_ID;
//   const client_secret = process.env.GOOGLE_CLIENT_SECRET;
//   const redirect_uris = process.env.GOOGLE_REDIRECT_URIS.split(",");

//   const oAuth2Client = new google.auth.OAuth2(
//     client_id,
//     client_secret,
//     redirect_uris[0]
//   );
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: SCOPES,
//   });

//   console.log("Authorize this app by visiting this URL:", authUrl);

//   const readline = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   readline.question("Enter the code from that page here: ", async (code) => {
//     const { tokens } = await oAuth2Client.getToken(code);
//     console.log("Your refresh token is:", tokens.refresh_token);
//     readline.close();
//   });
// }

// getNewToken();
