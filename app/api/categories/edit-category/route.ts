import { NextResponse } from "next/server";
import { editCategory, EditCategoryParams } from "@/app/actions/categories";

export async function PUT(req: Request) {
  try {
    const category: EditCategoryParams = await req.json();
    if (!category) {
      return NextResponse.json(
        { error: "La categoria a editar es requerida" },
        { status: 400 }
      );
    }
    await editCategory(category);
    return NextResponse.json({ message: "Success save data" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" });
  }
}
