"use client";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import BoughtListModal from "./boughtModal";
import { IList } from "@/app/lib/types";
import { Category } from "@/app/lib/types";

export default function List() {
  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [list, setList] = useState<Record<string, IList[]>>({});
  const [listModal, setLisModal] = useState<IList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCategories, setVisibleCategories] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (categories.length > 0) {
      const initialVisibility = categories.reduce((acc, category) => {
        acc[category.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setVisibleCategories(initialVisibility);
    }
  }, [categories]);

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
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchList() {
    const dataFechList = await fetch(
      "/api/list/get-list-products-by-categories",
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (!dataFechList.ok) {
      throw new Error("Error fetching List");
    }
    const filteredProductListByCategories = await dataFechList.json();

    setList(filteredProductListByCategories);
    setIsLoading(false);
  }
  const handleOpenModal = (list: IList) => {
    setLisModal(list);
  };

  const handleCloseModal = (updateList: IList | null) => {
    if (updateList) {
      setList((prevList) => {
        // Hacemos una copia de la lista previa
        const updatedListProduct = { ...prevList };

        // Actualizamos la categoría específica
        updatedListProduct[updateList.id_category] = prevList[
          updateList.id_category
        ].map((productList) => {
          // Si el id del producto coincide con el actualizado, lo reemplazamos
          return productList.id === updateList.id ? updateList : productList;
        });
        return updatedListProduct;
      });
    }
    setLisModal(null);
  };

  const toggleCategoryVisibility = (categoryId: string) => {
    setVisibleCategories((prevVisibleCategories) => ({
      ...prevVisibleCategories,
      [categoryId]: !prevVisibleCategories[categoryId],
    }));
  };

  return (
    <div className="m-3">
      {Array.isArray(categories) ? (
        categories
          .filter(
            (category) => list[category.id] && list[category.id].length > 0
          )
          .map((category) => (
            <div key={category.id}>
              <h2
                className=" text-xl pl-3 bg-slate-300  m-1"
                onClick={() => toggleCategoryVisibility(category.id)}
              >
                {`${category.name} ${
                  visibleCategories[category.id] ? "ᐃ" : "ᐁ"
                }`}
              </h2>
              {visibleCategories[category.id] && (
                <ul>
                  {list[category.id]?.map((productList) => (
                    <li
                      key={productList.id}
                      onClick={() => handleOpenModal(productList)}
                      className={`${
                        productList.comprado === "1"
                          ? "line-through"
                          : "no-underline"
                      } ml-4 bg-slate-100 m-1`}
                    >
                      {productList.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
      ) : (
        <p>No categories available</p>
      )}
      {listModal && (
        <BoughtListModal
          isOpen={!!listModal}
          onClose={handleCloseModal}
          idList={listModal.id}
          nameProductList={listModal.name}
          idProduct={listModal.id_product}
          idCategory={listModal.id_category}
        />
      )}

      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader size={50} color={"#123abc"} loading={isLoading} />
        </div>
      )}
    </div>
  );
}
