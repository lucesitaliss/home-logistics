import { NextResponse } from "next/server";
import { addCategory } from "@/app/actions";

export async function POST(req: Request) {
  try {
    const nameCategory = await req.json();
    await addCategory(nameCategory);
    return NextResponse.json({ message: "Success save data" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
