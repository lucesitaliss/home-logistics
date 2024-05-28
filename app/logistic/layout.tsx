import Menu from "../ui/menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="grid grid-rows-2"
      style={{ gridTemplateRows: "auto 100vh" }}
    >
      <Menu />
      {children}
    </div>
  );
}
