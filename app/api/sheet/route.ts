import { NextResponse } from "next/server";
import { appendToSheet } from "../../lib/sheet";

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    await appendToSheet({
      name,
      email,
    });
    return NextResponse.json(
      {
        message: "Success save data",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
