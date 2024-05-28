"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { databaseCategories, databaseProducts } from "./database";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  id_category: number;
  checked: boolean;
}

export default function Select() {
  const [selectedCategory, setSelectedCategoy] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchDatabase() {
      const categoriesData = await databaseCategories();
      setCategories(categoriesData);
      const productsData = await databaseProducts();
      setProducts(productsData);
      console.log("productsBD", productsData);
    }

    fetchDatabase();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const categoryID = parseInt(selectedCategory);
      setFilteredProducts(
        products.filter((product) => product.id_category === categoryID)
      );
      console.log("products2", products, filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handleSelectChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLSelectElement;
    setSelectedCategoy(target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const productId = parseInt(event.target.id);
    const isChecked = event.target.checked;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, checked: isChecked } : product
      )
    );
  };
  const handleButtonDelete = () => {
    setProducts(products.filter((product) => !product.checked));
  };

  return (
    <div className="p-4">
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
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <label key={product.id}>
              <input
                id={product.id.toString()}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={product.checked}
              />
              {product.name}
            </label>
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        <button className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-20">
          Editar
        </button>
        <button
          className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-20"
          onClick={handleButtonDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
