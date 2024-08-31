"use client";
import { useState, useEffect, SyntheticEvent } from "react";
import { ClipLoader } from "react-spinners";
import { capitalize } from "../../utils/capitalize";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteProductModal from "./deleteProductModal";
import { BiEditAlt } from "react-icons/bi";
import EditProductModal from "./editProductModal";
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

export interface NewProduct {
  name: string;
  idCategory: string;
}

export default function AddProduct() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategoy] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState<string>("");
  const [editModalProduct, setEditModalProduct] = useState<Product | null>(
    null
  );
  const [deleteModalProduct, deleteEditModalProduct] = useState<Product | null>(
    null
  );

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

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const nameCategory = capitalize(target.value);
    setNewProductName(nameCategory);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const product: NewProduct = {
      name: newProductName,
      idCategory: selectedCategory,
    };
    try {
      await fetch("/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNewProductName("");
      //window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOpenEditModal = (product: Product) => {
    setEditModalProduct(product);
  };

  const handleCloseEditModal = () => {
    setEditModalProduct(null);
  };

  const handleOpenDeleteModal = (product: Product) => {
    deleteEditModalProduct(product);
  };

  const handleCloseDeleteModal = () => {
    deleteEditModalProduct(null);
  };

  return (
    <div className="p-4 text-xs sm:text-sm">
      <div className=" flex flex-col  items-start gap-3">
        <form onSubmit={handleSubmit} className="  flex gap-2">
          <div className="">
            <input
              type="text"
              id="name"
              name="name"
              value={newProductName}
              onChange={handleChange}
              placeholder="Nuevo Producto"
              className=" border rounded-md py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-48"
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategoy(e.target.value)}
          className=" border rounded-md py-1 px-2 text-gray-700 leading-tight  h-full w-48"
        >
          {selectedCategory ? null : (
            <option value="">Seleccione una Categoria</option>
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
          <div key={product.id} className="flex p-2 gap-2 items-center">
            <BiEditAlt onClick={() => handleOpenEditModal(product)} />
            {editModalProduct?.id === product.id && (
              <EditProductModal
                isOpen={!!editModalProduct}
                onClose={handleCloseEditModal}
                idProduct={product.id}
                nameProduct={product.name}
              />
            )}
            <RiDeleteBin6Line onClick={() => handleOpenDeleteModal(product)} />
            {deleteModalProduct?.id === product.id && (
              <DeleteProductModal
                isOpen={!!deleteModalProduct}
                onClose={handleCloseDeleteModal}
                idProduct={product.id}
                nameProduct={product.name}
              />
            )}
            {product.name}
          </div>
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
