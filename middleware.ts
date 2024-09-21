"use server";
import { checkFolderExists } from "@/app/actions/googleDrive";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const folderName = "homeLogistic";
    const folderExists = await checkFolderExists(folderName);

    if (!folderExists) {
      return NextResponse.redirect(new URL("/no-data/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/error", request.url)); // Redirigir a una página de error si ocurre un problema
  }
}

export const config = {
  matcher: ["/logistic/"],
};
