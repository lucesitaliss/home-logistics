"use client";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditCategoryModal from "./editCategoryModal";
import DeleteCategoryModal from "./deleteCategoryModal";

interface Category {
  id: string;
  name: string;
}
export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalCategory, setEditModalCategory] = useState<Category | null>(
    null
  );

  const [deleteModalCategory, deleteEditModalCategory] =
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
  const handleOpenEditModal = (category: Category) => {
    setEditModalCategory(category);
  };

  const handleCloseEditModal = () => {
    setEditModalCategory(null);
  };

  const handleOpenDeleteModal = (category: Category) => {
    deleteEditModalCategory(category);
  };

  const handleCloseDeleteModal = () => {
    deleteEditModalCategory(null);
  };

  return (
    <div className="flex flex-col pt-5">
      {Array.isArray(categories) &&
        categories.map((category) => (
          <div key={category.id} className="flex p-2 gap-2 items-center">
            <BiEditAlt onClick={() => handleOpenEditModal(category)} />
            {editModalCategory?.id === category.id && (
              <EditCategoryModal
                isOpen={!!editModalCategory}
                onClose={handleCloseEditModal}
                idCategory={category.id}
                nameCategory={category.name}
              />
            )}
            <RiDeleteBin6Line onClick={() => handleOpenDeleteModal(category)} />
            {deleteModalCategory?.id === category.id && (
              <DeleteCategoryModal
                isOpen={!!deleteModalCategory}
                onClose={handleCloseDeleteModal}
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
