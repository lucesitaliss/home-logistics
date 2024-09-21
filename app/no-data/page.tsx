import File from "../ui/no-data/file";

export default function NoData() {
  return (
    <main>
      <div className="flex justify-center p-2 bg-zinc-400 ">
        {" "}
        Actualmente no tiene ningún archivo de datos, puede seleccionar una de
        las siguientes opciones:
      </div>
      <File />
    </main>
  );
}
