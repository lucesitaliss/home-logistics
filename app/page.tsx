import Authenticate from "./ui/authenticate";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
        <Authenticate />
      </div>
    </main>
  );
}
