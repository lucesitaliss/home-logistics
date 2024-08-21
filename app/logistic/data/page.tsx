import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <form>
        <input placeholder="Escriba el mail de la persona a compartir datos"></input>
      </form>
      <button className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-36">
        Compartir Archivo
      </button>
      <Link href="/logistic">Volver</Link>
    </main>
  );
}
