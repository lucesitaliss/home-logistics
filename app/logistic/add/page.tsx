import Select from "../../ui/add/select";
export default async function Home() {
  const csv = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyik0l3vRC2jHEnII_5CAejoW4jUNwPmJ6C7ebZZRdBIS8ciUzTmV1GGsvvXM5hHGCFk67Obqwf5o6/pub?output=csv"
  ).then((res) => res.text());

  const categories = csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [id, name] = row.split(",");
      return { id, name };
    });
  return (
    <main className="w-full min-h-screen">
      <Select />
    </main>
  );
}
