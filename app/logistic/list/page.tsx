import BoughtList from "@/app/ui/list/boughtModal";
import List from "@/app/ui/list/list";

export default function ListPage() {
  return (
    <main className="w-full min-h-screen">
      <div>List</div>
      <BoughtList />
      <List />
    </main>
  );
}
