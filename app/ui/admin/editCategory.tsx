"use client";
import { useState } from "react";

export default async function EditCategory() {
  const [category, setCategory] = useState({
    idCategory: "5",
    newNameCategory: "jardin",
  });
  const handleOnclick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // const category = { idCategory: "5", newNameCategory: "vegetales" };
    await fetch("/api/categories/edit-category", {
      method: "PUT",
      body: JSON.stringify(category),
      headers: {
        "content-Type": "application/json",
      },
    });
  };
  return <button onClick={handleOnclick}>Editar categoria</button>;
}
