import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/app/actions/products";

export async function GET(req: Request) {
  try {
    const { idCategory } = await req.json();
    if (!idCategory) {
      return NextResponse.json(
        { error: "Category id is required" },
        { status: 400 }
      );
    }
    const products = await getProductsByCategory(idCategory);
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
