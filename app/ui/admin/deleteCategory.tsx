"use client";
export default async function DeleteCategory() {
  const handleOnclick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await fetch("/api/categories/delete-category", {
      method: "DELETE",
      body: JSON.stringify("7"),
      headers: {
        "content-Type": "application/json",
      },
    });
  };
  return <button onClick={handleOnclick}>borrar categoria</button>;
}
