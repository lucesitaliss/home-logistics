import { NextResponse } from "next/server";
import { editCategory } from "@/app/actions/categories";
import { EditCategoryParams } from "@/app/lib/types";

export async function PUT(req: Request) {
  try {
    const category: EditCategoryParams = await req.json();
    if (!category) {
      return NextResponse.json({ error: "Required Category" }, { status: 400 });
    }
    await editCategory(category);
    return NextResponse.json({ message: "Success save data" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error });
  }
}
