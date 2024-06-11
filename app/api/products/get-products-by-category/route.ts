import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/app/actions/products";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id_category = url.searchParams.get("id_category");
    if (!id_category) {
      return NextResponse.json(
        { error: "El id de categoría es requerido" },
        { status: 400 }
      );
    }
    const products = await getProductsByCategory(id_category);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" });
  }
}
