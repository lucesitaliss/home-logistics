import { NextResponse } from "next/server";
import { editCheckedProducts } from "@/app/actions/products";

export async function PUT(req: Request) {
  try {
    const productsChecked = await req.json();
    if (!productsChecked) {
      return NextResponse.json(
        { error: "Product  is required" },
        { status: 404 }
      );
    }
    await editCheckedProducts(productsChecked);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
