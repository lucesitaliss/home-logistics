"use server";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { sheetDoc } from "../lib/googleFileSheetConection";
import { getProductsChecked } from "./products";

interface List {
  id: string;
  id_product: string;
  name: string;
  id_category: string;
  unidad: string;
  precio: string;
  total: string;
  comprado: string;
}

export async function addList(): Promise<void> {
  const doc = await sheetDoc();
  await doc.loadInfo();
  const sheetList = doc.sheetsByTitle["list"];

  if (sheetList) {
    const rowsList = await sheetList.getRows();
    let maxId = 0;

    // Encontrar el ID máximo actual en la hoja
    rowsList.forEach((row: GoogleSpreadsheetRow) => {
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
    // Obtener todos los id_product ya en la lista
    const existingProducts = rowsList.map((row) => row.get("id_product"));

    // Obtener los productos chequeados
    const productChecked = await getProductsChecked();

    // Filtrar los productos que no están ya en la lista
    const productsToAdd = productChecked.filter(
      (product) => !existingProducts.includes(product.id)
    );

    // Agregar solo los productos que no están en la lista

    for (const item of productsToAdd) {
      const newId = ++maxId; // Incrementar el ID para cada nuevo objeto
      const id = newId.toString();

      const data = {
        id: id,
        id_product: item.id,
        name: item.name,
        id_category: item.id_category,
        unidad: "",
        precio: "",
        total: "",
        comprado: "",
      };

      // Agregar cada objeto a la hoja como una nueva fila
      await sheetList.addRow(data);
    }
  } else {
    throw new Error('Sheet named "list" not found');
  }
}

export async function getList(): Promise<List[]> {
  const doc = await sheetDoc();
  await doc.loadInfo();
  const sheetList = doc.sheetsByTitle["list"];

  if (sheetList) {
    const rowsList = await sheetList.getRows();

    const productList: List[] = rowsList.map((row) => ({
      id: row.get("id") || "",
      id_product: row.get("id_product") || "",
      name: row.get("name") || "",
      id_category: row.get("id_category") || "",
      unidad: row.get("unidad") || "",
      precio: row.get("precio") || "",
      total: row.get("total") || "",
      comprado: row.get("comprado") || "",
    }));

    return productList;
  } else {
    throw new Error('No se encontró la hoja "list" en Google Sheets');
  }
}

export async function bought(
  id: string,
  unidad: number,
  precio: number
): Promise<void> {
  const doc = await sheetDoc();
  await doc.loadInfo();
  const sheetList = doc.sheetsByTitle["list"];

  if (sheetList) {
    const rowsList = await sheetList.getRows();

    const rowToUpdate = rowsList.find((row) => row.get("id") === id);

    if (rowToUpdate) {
      const total = unidad * precio;

      const currencyFormatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS", // Puedes cambiar 'ARS' por el código de la moneda que necesites (por ejemplo, USD, EUR, etc.)
      });

      // Actualizar los valores de la fila
      rowToUpdate.set("unidad", unidad);
      rowToUpdate.set("precio", currencyFormatter.format(precio));
      rowToUpdate.set("total", currencyFormatter.format(total));
      rowToUpdate.set("comprado", "1");

      // Guardar los cambios en la hoja de cálculo
      await rowToUpdate.save();
    } else {
      throw new Error(`No se encontró la fila con el ID: ${id}`);
    }
  } else {
    throw new Error('No se encontró la hoja "list" en Google Sheets');
  }
}
