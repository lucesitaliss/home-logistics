import Authenticate from "./ui/authenticate";
import FormPrueba from "./formPrueba";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
        <FormPrueba />
        <Authenticate />
      </div>
    </main>
  );
}
