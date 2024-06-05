import Select from "../../ui/add/select";

import AddCategory from "../../ui/add/addCategory";

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Select />
      <AddCategory />
      {/* <button onClick={() => editCategory("2", "prueba")}>
        Editar Categoria
      </button> */}
    </main>
  );
}
