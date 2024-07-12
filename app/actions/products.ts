"use server";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import jwt from "../lib/googleApiAuth";

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

export interface EditProductParams {
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
interface ProductChecked {
  idProduct: string;
  checked: boolean;
}
export async function editCheckedProduct(
  productChecked: ProductChecked
): Promise<void> {
  try {
    const checked = productChecked.checked ? "1" : "0";
    await doc.loadInfo();
    const sheetProducts = doc.sheetsByTitle["products"];
    if (!sheetProducts) {
      throw new Error('Sheet "Products" not found');
    }
    const rowsProducts = await sheetProducts.getRows();
    const findProductRow = rowsProducts.find(
      (row) => row.get("id") === productChecked.idProduct
    );
    if (!findProductRow) {
      throw new Error(`No row found with id:${productChecked.idProduct}`);
    }

    findProductRow.set("checked", checked);
    await findProductRow.save();
  } catch (error) {
    console.error(error);
  }
}

interface Products {
  id: string;
  name: string;
  id_category: string;
  checked: boolean;
}

export async function editCheckedProducts(
  productsChecked: Products[]
): Promise<void> {
  try {
    // Crear diccionario con productos chequeados y convertirlo a formato string con 0 y 1
    const checkedDict = productsChecked.reduce(
      (acc: { [key: string]: string }, product) => {
        acc[product.id] = product.checked ? "1" : "0";
        return acc;
      },
      {}
    ); //ejemplo {"1":"1","2":"1","3":"0"}

    await doc.loadInfo();

    const sheetProducts = doc.sheetsByTitle["products"];
    if (!sheetProducts) {
      throw new Error('Sheet "Products" not found');
    }

    const rowsProducts = await sheetProducts.getRows();

    for (const rowProduct of rowsProducts) {
      const rowId = rowProduct.get("id");
      if (checkedDict.hasOwnProperty(rowId)) {
        rowProduct.set("checked", checkedDict[rowId]);
        await rowProduct.save();
      }
    }
  } catch (error) {
    console.error("Error updating products:", error);
  }
}

export async function deleteProductById(idProduct: string): Promise<void> {
  await doc.loadInfo();

  const sheetProducts = doc.sheetsByTitle["products"];

  if (sheetProducts) {
    const rows = await sheetProducts.getRows();
    const findRow = rows.find((row) => row.get("id") === idProduct);
    if (findRow) {
      await findRow.delete();
    }
  } else {
    throw new Error('Sheet named "categories" not found');
  }
}
export interface AddProduct {
  name: string;
  idCategory: string;
}

export async function addProduct(product: AddProduct): Promise<void> {
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["products"];
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
      id,
      name: product.name,
      id_category: product.idCategory,
      checked: "0",
    };
    await sheet.addRow(data);
  } else {
    throw new Error('Sheet named "categorias" not found');
  }
}
