import { NextResponse } from "next/server";
import { addProduct } from "@/app/actions/products";

export async function POST(req: Request) {
  try {
    const product = await req.json();
    await addProduct(product);
    return NextResponse.json({ message: "Success save data" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
