export async function databaseCategories() {
  const csv = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyik0l3vRC2jHEnII_5CAejoW4jUNwPmJ6C7ebZZRdBIS8ciUzTmV1GGsvvXM5hHGCFk67Obqwf5o6/pub?gid=184307761&single=true&output=csv"
  ).then((res) => res.text());
  return csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [id, name] = row.split(",");
      return { id: parseInt(id, 10), name };
    });
}

export async function databaseProducts() {
  const csv = await fetch(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyik0l3vRC2jHEnII_5CAejoW4jUNwPmJ6C7ebZZRdBIS8ciUzTmV1GGsvvXM5hHGCFk67Obqwf5o6/pub?gid=1301880337&single=true&output=csv"
  ).then((res) => res.text());
  return csv
    .split("\n")
    .slice(1)
    .map((row) => {
      const [id, name, id_category, checked] = row.split(",");
      return {
        id: parseInt(id, 10),
        name,
        id_category: parseInt(id_category, 10),
        checked: checked.toLowerCase() === "true",
      };
    });
}
