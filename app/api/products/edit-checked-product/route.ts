import { NextResponse } from "next/server";
import { editCheckedProduct } from "@/app/actions/products";

export async function PUT(req: Request) {
  try {
    const productChecked = await req.json();
    if (!productChecked) {
      return NextResponse.json(
        { error: "Product  is required" },
        { status: 404 }
      );
    }
    await editCheckedProduct(productChecked);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
