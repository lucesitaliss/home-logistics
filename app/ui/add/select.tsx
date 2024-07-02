"use client";
import { useState, useEffect, SyntheticEvent } from "react";

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

export default function Select() {
  const [selectedCategory, setSelectedCategoy] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetcProducts();
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
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetcProducts() {
    if (selectedCategory) {
      const productsResponse = await fetch(
        `/api/products/get-products-by-category}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ idCategory: selectedCategory }),
        }
      );
      if (!productsResponse.ok) {
        throw new Error("Error fetching productos by categories");
      }
      const productsData = await productsResponse.json();
      setProducts(productsData);
    }
  }

  const handleSelectChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLSelectElement;
    setSelectedCategoy(target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const productId = event.target.id;
    const isChecked = event.target.checked;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        String(product.id) === productId
          ? { ...product, checked: isChecked }
          : product
      )
    );
  };
  async function handleButton() {}

  return (
    <div className="p-4 text-xs sm:text-sm">
      <select value={selectedCategory} onChange={handleSelectChange}>
        {selectedCategory ? null : (
          <option value=""> Seleccione una Categoria </option>
        )}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="pt-4">
        {products.map((product) => (
          <div key={product.id}>
            <label key={product.id}>
              <input
                id={product.id}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={product.checked}
              />
              {product.name}
            </label>
          </div>
        ))}
      </div>
      {/* <div className="flex gap-6">
        <button className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-20">
          Editar
        </button>
        <button
          className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-20"
          onClick={handleButtonDelete}
        >
          Eliminar
        </button>
      </div> */}
      <button onClick={handleButton}>prueba</button>
    </div>
  );
}
