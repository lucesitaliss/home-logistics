"use server";
// import { google } from "googleapis";
// import { auth } from "../../auth";

// import jwt from "../lib/googleApiAuth";

// const drive = google.drive({ version: "v3", auth: jwt });

// export const getOrCreateSpreadsheet = async (spreadsheetName: string) => {
// const session = await auth();
// const drive = google.drive({ version: "v3", auth: session?.idToken });
//   try {
//     // await jwt.authorize();
//     const oauth2Client = await auth();
//     if (!oauth2Client) {
//       throw new Error("No se pudo autenticar el usuario.");
//     }

//     // const response = await drive.files.list({
//     //   q: `name='${spreadsheetName}' and mimeType='application/vnd.google-apps.spreadsheet'`,
//     //   fields: "files(id, name)",
//     // });
//     const drive = google.drive({
//       version: "v3",
//       auth: oauth2Client.accessToken,
//     });

//     const sharedFilesResponse = await drive.files.list({
//       q: `sharedWithMe and mimeType='application/vnd.google-apps.spreadsheet'`,
//       fields: "files(id, name)",
//     });

//     const files = [
//       ...(sharedFilesResponse.data.files || []),
//       ...(sharedFilesResponse.data.files || []),
//     ];

//     if (files.length > 0) {
//       // return files[0].id;
//       return files;
//     } else {
//       const newFile = await drive.files.create({
//         requestBody: {
//           name: spreadsheetName,
//           mimeType: "application/vnd.google-apps.spreadsheet",
//         },
//         fields: "id",
//       });
//       return newFile.data.id;
//     }
//   } catch (error) {
//     console.error("Error getting or creating spreadsheet:", error);
//     throw error;
//   }
// };
import { auth } from "../../auth";

export const checkFolderExists = async (folderName: string) => {
  const session = await auth();
  if (!session) {
    throw new Error("No se pudo autenticar el usuario.");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("No se pudo obtener el accessToken.");
  }

  // const response = await fetch(`https://www.googleapis.com/drive/v3/files`, {
  const query = encodeURIComponent(
    `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`
  );
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error al buscar la carpeta");
  }

  const data = await response.json();
  return data.files.length > 0 ? data.files[0] : null;
};

export async function createFolder(folderName: string) {
  const session = await auth();
  if (!session) {
    throw new Error("No se pudo autenticar el usuario.");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("No se pudo obtener el accessToken.");
  }
  const response = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
    }),
  });

  if (!response.ok) {
    throw new Error("Error al crear la carpeta");
  }

  const data = await response.json();
  return data;
}
