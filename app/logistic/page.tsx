import { auth } from "../../auth";
import List from "../ui/list/list";

import Image from "next/image";

export default async function Home() {
  return (
    <main>
      <List />
    </main>
  );
}
