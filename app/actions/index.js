"use server";
import { signIn, signOut } from "../../auth";

import { GoogleSpreadsheet } from "google-spreadsheet";
import jwt from "../lib/googleSheet";

const doc = new GoogleSpreadsheet(process.env.NEXT_PUBLIC_SPREADSHEET_ID, jwt);

export async function doGoogleLogin() {
  await signIn("google", { redirectTo: "/logistic" });
}

export async function doGoogleLogout() {
  await signOut("google");
}

export async function addCategory(nameCategory) {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["categories"];
  if (sheet) {
    const rows = await sheet.getRows();
    let maxId = 0;

    rows.forEach((row) => {
      const rawId = row._rawData[0];
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

export async function deleteCategory(idCategory) {
  await doc.loadInfo();
  const sheetCategory = doc.sheetsByTitle["categories"];
  if (sheetCategory) {
    const rows = await sheetCategory.getRows();

    const findRow = rows.find((row) => row._rawData[0] == idCategory);
    if (findRow) {
      await findRow.delete();
    }
  } else {
    throw new Error('Sheet named "categories" not found');
  }
}

export async function editCategory(idCategory, newNameCategory) {
  await doc.loadInfo();
  const sheetCategory = doc.sheetsByTitle["categories"];
  if (sheetCategory) {
    const rows = await sheetCategory.getRows();
    const findRow = rows.find((row) => row._rawData[0] == idCategory);

    if (findRow) {
      findRow._rawData[1] = newNameCategory;
      await findRow.save();
    }
  } else {
    throw new Error(`No row found with id: ${idCategory}`);
  }
}
