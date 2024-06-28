"use server";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import jwt from "../lib/googleSheet";

const doc = new GoogleSpreadsheet(
  process.env.NEXT_PUBLIC_SPREADSHEET_ID as string,
  jwt
);

interface Products {
  id: string;
  name: string;
  id_category: string;
  checked: boolean;
}

export async function getProducts(): Promise<Products[]> {
  await doc.loadInfo();
  const sheetProducts = doc.sheetsByTitle["products"];
  if (sheetProducts) {
    const rows = await sheetProducts.getRows();

    const plainRows = rows.map((row) => ({
      id: row.get("id"),
      name: row.get("name"),
      id_category: row.get("id_category"),
      checked: row.get("checked"),
    }));
    return plainRows;
  } else {
    throw new Error("No se encontro la hoja Productos de Google Sheet");
  }
}

export async function getProductsByCategory(
  id_category: string
): Promise<Products[]> {
  if (id_category) {
    const products = await getProducts();
    if (products) {
      const productsByCategory = products.filter(
        (product) => product.id_category === id_category
      );
      return productsByCategory;
    } else {
      throw new Error("No se encontro la hoja Productos de Google Sheet");
    }
  } else {
    throw new Error("El id de categoria no es valido");
  }
}

interface EditProductParams {
  idProduct: string;
  newNameProduct: string;
}

export async function editNameProduct(
  product: EditProductParams
): Promise<void> {
  try {
    const { idProduct, newNameProduct } = product;
    await doc.loadInfo();
    const sheetProducts = doc.sheetsByTitle["products"];
    if (!sheetProducts) {
      throw new Error('Sheet "Products" not found');
    }
    const rowsProducts = await sheetProducts.getRows();
    const findProductRow = rowsProducts.find(
      (row) => row.get("id") === idProduct
    );
    if (!findProductRow) {
      throw new Error(`No row found with id:${idProduct}`);
    }
    findProductRow.set("name", newNameProduct);
    await findProductRow.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function editCheckProduct(id_product: string): Promise<void> {
  try {
    await doc.loadInfo();
    const sheetProducts = doc.sheetsByTitle["products"];
    if (!sheetProducts) {
      throw new Error('Sheet "Products" not found');
    }
    const rowsProducts = await sheetProducts.getRows();
    const findProductRow = rowsProducts.find(
      (row) => row.get("id") === id_product
    );
    if (!findProductRow) {
      throw new Error(`No row found with id:${id_product}`);
    }
    const currendCheckedValue = findProductRow.get("checked") === "1";
    findProductRow.set("checked", currendCheckedValue ? "0" : "1");
    await findProductRow.save();
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProductById() {}
