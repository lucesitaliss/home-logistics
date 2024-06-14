import { NextResponse } from "next/server";
import { deleteCategory } from "@/app/actions/categories";

export async function DELETE(req: Request) {
  try {
    const idCategory = await req.json();
    if (!idCategory) {
      return NextResponse.json(
        { error: "El id de categoría es requerido" },
        { status: 400 }
      );
    }
    await deleteCategory(idCategory);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" });
  }
}
