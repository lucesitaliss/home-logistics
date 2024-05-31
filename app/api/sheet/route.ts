import { appendToSheet } from "../../lib/sheet";

export async function POST(req: Request, res: any) {
  try {
    const { name, email } = await req.json();
    //  const { name, email } = req.body;
    const data = await appendToSheet({
      name,
      email,
    });
    res.status(200).json({
      message: "Success save data",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
