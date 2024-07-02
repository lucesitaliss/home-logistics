import DeleteCategory from "@/app/ui/admin/deleteCategory";
import AddCategory from "../../ui/admin/addCategory";
import EditCategory from "@/app/ui/admin/editCategory";

export default function Admin() {
  return (
    <main className="w-full min-h-screen">
      <div>Add</div>
      <DeleteCategory />
      <EditCategory />
      <AddCategory />
    </main>
  );
}
