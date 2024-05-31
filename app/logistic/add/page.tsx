import Select from "../../ui/add/select";

import { SessionProvider } from "next-auth/react";
import AddCategory from "../../ui/add/addCategory";

export default async function Home() {
  return (
    <main className="w-full min-h-screen">
      <Select />
      <AddCategory />
    </main>
  );
}
