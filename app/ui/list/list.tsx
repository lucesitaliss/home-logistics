"use client";
import { ListProductsByCategory } from "@/app/actions/list";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import BoughtListModal from "./boughtModal";
import { IList } from "@/app/actions/types";
import { Category } from "@/app/actions/types";

export default function List() {
  useEffect(() => {
    fetchList();
    fetchCategories();
  }, []);

  const [categories, setCategories] = useState<Category[]>([]);
  const [list, setList] = useState<Record<string, IList[]>>({});
  const [listModal, setLisModal] = useState<IList | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    const dataFechList = await ListProductsByCategory();
    if (dataFechList) {
      setList(dataFechList);
      setIsLoading(false);
    }
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

  return (
    <div>
      {Array.isArray(categories) ? (
        categories.map((category) => (
          <div key={category.id}>
            <h2 className="bg-slate-200 ">{category.name}</h2>
            <ul>
              {list[category.id]?.map((productList) => (
                <li
                  key={productList.id}
                  onClick={() => handleOpenModal(productList)}
                  className={
                    productList.comprado === "1"
                      ? "line-through"
                      : "no-underline"
                  }
                >
                  {productList.name}
                </li>
              ))}
            </ul>
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
