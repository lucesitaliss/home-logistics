export default function NoData() {
  return (
    <main>
      <div>
        {" "}
        Actualmente no tiene ninguna carpeta de datos, seleccione una de las
        siguientes opciones:
      </div>
      <div className="flex flex-col gap-6 pl-3">
        <button className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-36">
          Crear Archivo
        </button>
        <button className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-36">
          Solicitar Archhivo
        </button>
      </div>
    </main>
  );
}
