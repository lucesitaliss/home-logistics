import Authenticate from "./ui/authenticate";
import "./globals.css";
export default function Home() {
  return (
    <main>
      <div className="bg-gray-200 flex justify-center items-center h-[100vh]">
        <Authenticate />
      </div>
    </main>
  );
}
