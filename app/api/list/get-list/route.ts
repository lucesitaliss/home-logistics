import { NextResponse } from "next/server";
import { getList } from "@/app/actions/list";

export async function GET() {
  try {
    const productList = await getList();
    return NextResponse.json(productList);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" });
  }
}
