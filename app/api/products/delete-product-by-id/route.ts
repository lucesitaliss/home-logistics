import { NextResponse } from "next/server";
import { deleteProductById } from "@/app/actions/products";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idProduct = url.searchParams.get("id_product");
    if (!idProduct) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 404 }
      );
    }
    const changeChecked = await deleteProductById(idProduct);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
