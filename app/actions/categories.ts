"use server";

import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { googleSessionAuth } from "../lib/googleSessionAuth";
import { getSheetFileId } from "../lib/googleDatabase";
import { OAuth2Client } from "google-auth-library";

// import jwt from "../lib/googleApiAuth";

// const doc = new GoogleSpreadsheet(
//   process.env.NEXT_PUBLIC_SPREADSHEET_ID as string,
//   jwt
// );

interface Category {
  id: string;
  name: string;
}
// Función para obtener el cliente OAuth2
const getOAuth2Client = (accessToken: string): OAuth2Client => {
  const oauth2Client = new OAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  return oauth2Client;
};

export async function getCategories(): Promise<Category[]> {
  const { session } = await googleSessionAuth();
  if (!session || !session.accessToken) {
    throw new Error(
      "No se pudo autenticar el usuario o no se obtuvo el accessToken."
    );
  }

  const accessToken = session.accessToken;
  const sheetFileId = await getSheetFileId();
  if (!sheetFileId) {
    throw new Error("No se pudo obtener el ID de la hoja de cálculo.");
  }

  // Obtener el cliente OAuth2
  const authClient = getOAuth2Client(accessToken);
  // Crear una instancia de GoogleSpreadsheet
  const doc = new GoogleSpreadsheet(sheetFileId, authClient);

  await doc.loadInfo();
  const sheetCategories = doc.sheetsByTitle["categories"];

  if (sheetCategories) {
    const rows = await sheetCategories.getRows();
    const plainRows: Category[] = rows.map((row: GoogleSpreadsheetRow) => ({
      id: row.get("id") as string,
      name: row.get("name") as string,
    }));
    return plainRows;
  } else {
    throw new Error('Sheet named "categories" not found');
  }
}

export async function addCategory(nameCategory: string): Promise<void> {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["categories"];
  if (sheet) {
    const rows = await sheet.getRows();
    let maxId = 0;

    rows.forEach((row: GoogleSpreadsheetRow) => {
      const rawId = row.get("id") as string;
      if (rawId) {
        const currentId = parseInt(rawId, 10);
        if (!isNaN(currentId) && currentId > maxId) {
          maxId = currentId;
        }
      } else {
        console.log("No ID found in row:", row);
      }
    });
    const newId = maxId + 1;
    const id = newId.toString();
    const data = {
      id: id,
      name: nameCategory,
    };
    await sheet.addRow(data);
  } else {
    throw new Error('Sheet named "categorias" not found');
  }
}

export async function deleteCategoryById(idCategory: string): Promise<void> {
  await doc.loadInfo();
  const sheetCategory = doc.sheetsByTitle["categories"];
  if (sheetCategory) {
    const rows = await sheetCategory.getRows();

    const findRow = rows.find((row) => row.get("id") === idCategory);
    if (findRow) {
      await findRow.delete();
    }
  } else {
    throw new Error('Sheet named "categories" not found');
  }
}
export interface EditCategoryParams {
  idCategory: string;
  newNameCategory: string;
}

export async function editCategory(
  category: EditCategoryParams
): Promise<void> {
  try {
    const { idCategory, newNameCategory } = category;
    await doc.loadInfo();
    const sheetCategory = doc.sheetsByTitle["categories"];
    if (!sheetCategory) {
      throw new Error('Sheet "categories" not found');
    }
    const rows = await sheetCategory.getRows();
    const findRow = rows.find((row) => row.get("id") === idCategory);

    if (!findRow) {
      throw new Error(`No row found with id: ${idCategory}`);
    }

    findRow.set("name", newNameCategory);
    await findRow.save();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
}
