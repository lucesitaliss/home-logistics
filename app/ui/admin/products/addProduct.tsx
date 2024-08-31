"use client";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  id_category: string;
  checked: boolean;
}
export default function AddProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategoy] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    setIsLoading(true);
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const categoriesRespone = await fetch("/api/categories/get-categories", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!categoriesRespone.ok) {
        throw new Error("Error fetching categories");
      }
      const categoriesData = await categoriesRespone.json();
      if (Array.isArray(categoriesData)) {
        setCategories(categoriesData);
      } else {
        console.error("Categories data is not an array:", categoriesData);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  async function fetchProducts() {
    if (selectedCategory) {
      const productsResponse = await fetch(
        "/api/products/get-products-by-category",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id_category: selectedCategory }),
        }
      );
      if (!productsResponse.ok) {
        throw new Error("Error fetching productos by categories");
      }
      const productsData = await productsResponse.json();

      setProducts(productsData);
      setIsLoading(false);
    }
  }
  return (
    <div className="p-4 text-xs sm:text-sm">
      <div className=" flex gap-2  items-start">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategoy(e.target.value)}
          className="border border-gray-100 rounded p-2"
        >
          {selectedCategory ? null : (
            <option value=""> Seleccione una Categoria </option>
          )}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pt-4">
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
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
