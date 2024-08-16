import Link from "next/link";
import { doGoogleLogout } from "../actions/authenticate";
import { auth } from "../../auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Menu() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <div className="bg-gray-700 p-2  justify-around text-white">
      <div className="flex justify-center sm:justify-end gap-3 text-xs sm:text-sm items-center">
        <form action={doGoogleLogout}>
          <button type="submit">Signin Out</button>
        </form>
        <p className="hidden sm:block">{session?.user?.name}</p>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex  justify-center gap-5 sm:gap-10 text-xs sm:text-sm">
        <Link href="/logistic/list">Lista</Link>
        <Link href="/logistic/add">Agregar</Link>
        <Link href="/logistic/admin">Admin</Link>
        <Link href="/logistic/data">Datos</Link>
      </div>
    </div>
  );
}
