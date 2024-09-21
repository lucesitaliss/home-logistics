"use client";

import { useState, SyntheticEvent } from "react";
import { capitalize } from "../../utils/capitalize";

export default function FormPrueba() {
  const [formData, setFormData] = useState<string>("");

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const nameCategory = capitalize(target.value);
    setFormData(nameCategory);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch("/api/categories/add-category", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormData("");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className=" mx-auto mt-2 flex gap-2">
        <div className="">
          <input
            type="text"
            id="name"
            name="name"
            value={formData}
            onChange={handleChange}
            placeholder="Nueva Categoria"
            className=" border rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center ">
          <button
            type="submit"
            className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Agregar
          </button>
        </div>
      </form>
    </>
  );
}
