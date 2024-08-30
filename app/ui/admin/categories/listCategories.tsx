"use client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface Category {
  id: string;
  name: string;
}
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await fetch("/api/categories/get-categories", {
        method: "GET",
        headers: { "content-tyope": "aplication/json" },
      });
      if (!categoriesResponse.ok) {
        throw new Error("Error fetching categories");
      }
      const listCategories = await categoriesResponse.json();
      setCategories(listCategories);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
