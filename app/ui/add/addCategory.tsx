"use client";

import { useState, SyntheticEvent } from "react";

export default function FormPrueba() {
  const [formData, setFormData] = useState<string>("");

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setFormData(target.value);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch("/api/add-category", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setFormData("");
      alert("Se insertó la Categoria exitosamente!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <h2 className="mb-4 text-2xl">Inserte una nueva Categoria</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name:
          </label>{" "}
          <input
            type="text"
            id="name"
            name="name"
            value={formData}
            onChange={handleChange}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
