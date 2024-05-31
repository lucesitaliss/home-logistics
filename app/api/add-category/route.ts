import { addCategory } from "@/app/actions";

export async function POST(req: Response, res: any) {
  try {
    const nameCategory = await req.json();
    await addCategory(nameCategory);
    res.status(200).json({ message: "Success save data" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
