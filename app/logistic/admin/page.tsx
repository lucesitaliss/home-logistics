import DeleteCategory from "@/app/ui/admin/deleteCategory";
import AddCategory from "../../ui/admin/addCategory";

export default function Admin() {
  return (
    <main className="w-full min-h-screen">
      <div>Add</div>
      <DeleteCategory />
      <AddCategory />
    </main>
  );
}
