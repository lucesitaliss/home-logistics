"use server";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { sheetDoc } from "../lib/googleFileSheetConection";
import { shoppingList } from "./list";
import { unCheckProducts } from "./products";
import { deleteShoppingList } from "./list";

export async function addHistorical(): Promise<void> {
  const doc = await sheetDoc();
  await doc.loadInfo();
  const sheethistorical = doc.sheetsByTitle["historical"];

  if (sheethistorical) {
    const rowshistorical = await sheethistorical.getRows();

    let maxId = 0;

    rowshistorical.forEach((row: GoogleSpreadsheetRow) => {
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

    const shoppingListData = await shoppingList();

    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES");
    try {
      for (const item of shoppingListData) {
        const newId = ++maxId;
        const id = newId.toString();

        const data = {
          id: id,
          id_list: item.id,
          id_product: item.id_product,
          name: item.name,
          id_category: item.id_category,
          cantidad: item.cantidad,
          medida: item.medida,
          precio: item.precio,
          precio_total: item.precioTotal,
          precio_kg: item.precioKg,
          kg_total: item.kgTotal,
          fecha: formattedDate,
        };

        await sheethistorical.addRow(data);
      }
      await unCheckProducts();
      await deleteShoppingList();
    } catch (error) {
      console.error("Error during the loop:", error);

      throw new Error("Error adding rows to historical sheet");
    }
  } else {
    throw new Error('Sheet named "list" not found');
  }
}
