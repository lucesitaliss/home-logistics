"use server";

import { googleSessionAuth } from "../lib/googleSessionAuth";

export const checkFolderExists = async (folderName: string) => {
  const { accessToken } = await googleSessionAuth();
  if (!accessToken) {
    throw new Error("There are problems with user authentication");
  }

  const query = encodeURIComponent(
    `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`
  );

  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)&includeItemsFromAllDrives=true&supportsAllDrives=true`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Error al buscar la carpeta: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  const data = await response.json();

  return data.files.length > 0 ? data.files[0] : null;
};

export async function createFolderAndSheet(
  folderName: string,
  sheetName: string
) {
  const { session } = await googleSessionAuth();
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
}

export async function shareFolder(
  folderName: string,
  folderId: string,
  emailToShare: string
) {
  const { session } = await googleSessionAuth();
  if (!session) {
    throw new Error("No se pudo autenticar el usuario.");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("No se pudo obtener el accessToken.");
  }
  const createFolderURL = `https://www.googleapis.com/drive/v3/files/${folderId}/permissions`;
  const permissionMetadata = {
    role: "writer",
    type: "user",
    emailAddress: emailToShare,
  };
  const shareResponse = await fetch(createFolderURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(permissionMetadata),
  });

  if (!shareResponse.ok) {
    throw new Error("Error al compartir la carpeta");
  }
}

export async function listFilesInSharedFolder(folderId: string) {
  const { session } = await googleSessionAuth();
  if (!session) {
    throw new Error("No se pudo autenticar el usuario.");
  }
  const accessToken = session.accessToken;
  if (!accessToken) {
    throw new Error("No se pudo obtener el accessToken.");
  }
  const listFolderURL = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents`;

  const response = await fetch(listFolderURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al mostrar carpetas compartida");
  }
  const data = await response.json();
  return data.files;
}

export async function sendEmail(to: string, subject: string, message: string) {
  const { session } = await googleSessionAuth();
  if (!session) {
    throw new Error("No se pudo autenticar el usuario.");
  }
  const accessToken = session.accessToken;
  try {
    const email = [`To: ${to}`, `Subject: ${subject}`, "", message].join("\n");

    const rawMessage = Buffer.from(email)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: rawMessage,
        }),
      }
    );

    const data = await response.json();
    console.log("Correo enviado:", data);
  } catch (error) {
    console.error("Error al enviar correo:", error);
  }
}
