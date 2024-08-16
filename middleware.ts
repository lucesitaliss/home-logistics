"use server";
import { checkFolderExists } from "@/app/actions/googleDrive";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const folderName = "homeLogistic";
  const folderExists = await checkFolderExists(folderName);

  if (!folderExists) {
    return NextResponse.redirect(new URL("/no-data/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/logistic/",
};
