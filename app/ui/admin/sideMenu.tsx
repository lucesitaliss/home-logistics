import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SideMenu() {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div className="bg-gray-500 text-white justify-start  h-full">
      <div className="flex flex-col items-center justify-end gap-5 p-3 text-xs sm:text-sm">
        <Link
          href="/logistic/admin/categories"
          className=" p-1 text-xl rounded-xl focus:outline-none focus:bg-slate-200 focus:text-slate-800"
        >
          Categorias
        </Link>
        <Link
          href="/logistic/admin/products"
          className=" p-1 text-xl rounded-xl focus:outline-none focus:bg-slate-200 focus:text-slate-800"
        >
          Productos
        </Link>
      </div>
    </div>
  );
}
