import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SideMenu() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div className="bg-gray-500 text-white justify-start  h-full">
      <div className="flex flex-col items-center justify-center gap-5 p-10 text-xs sm:text-sm">
        <Link href="/logistic/admin/categories">Categorias</Link>
        <Link href="/logistic/admin/products">Productos</Link>
      </div>
    </div>
  );
}
