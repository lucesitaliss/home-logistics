import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-52">
        Compartir Archivo
      </button>
      <Link href="/logistic" className="hover:font-bold">
        Volver
      </Link>
    </main>
  );
}
