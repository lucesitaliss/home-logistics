"use client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditCategoryModal from "./editCategoryModal";

interface Category {
  id: string;
  name: string;
}
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalCurrenCategory, setModalCurrenCategory] =
    useState<Category | null>(null);

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
  const handleOpenModal = (category: Category) => {
    setModalCurrenCategory(category);
  };

  const handleClose = () => {
    setModalCurrenCategory(null);
  };

  return (
    <div className="flex flex-col pt-5">
      {categories.map((category) => (
        <div key={category.id} className="flex p-2 gap-2 items-center">
          <BiEditAlt onClick={() => handleOpenModal(category)} />
          {modalCurrenCategory?.id === category.id && (
            <EditCategoryModal
              isOpen={!!modalCurrenCategory}
              onClose={handleClose}
              idCategory={category.id}
              nameCategory={category.name}
            />
          )}
          {category.name}
        </div>
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
