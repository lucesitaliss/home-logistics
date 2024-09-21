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
        const updatedListProduct = { ...prevList };

        updatedListProduct[updateList.id_category] = prevList[
          updateList.id_category
        ].map((productList) => {
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

  const clean = async () => {
    setIsLoading(true);

    await fetch("/api/historical/add-historical", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });

    fetchList();
    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
    categoryId: string,
    field: string
  ) => {
    const { value } = e.target;

    setList((prevList) => {
      const updatedList = { ...prevList };
      updatedList[categoryId] = prevList[categoryId].map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      );
      return updatedList;
    });
  };

  const save = async () => {
    setIsLoading(true);
    // Transformar el diccionario en un array de productos
    const productsToUpdate = Object.values(list)
      .flat()
      .map((product) => ({
        id: product.id,
        cantidad: parseFloat(product.cantidad),
        medida: parseFloat(product.medida),
        precio: parseFloat(product.precio),
      }));

    // Filtrar los productos que tengan valores en los campos 'cantidad' y 'medida'
    const changedProducts = productsToUpdate.filter((product) => {
      return product.cantidad > 0 && product.medida > 0;
    });

    // Llamar a la función updateMultipleProducts con los productos cambiados
    if (changedProducts.length > 0) {
      try {
        await fetch("/api/list/update-multiple-products", {
          method: "PUT",
          body: JSON.stringify(changedProducts),
          headers: {
            "content-Type": "application/json",
          },
        });

        setIsLoading(false);
      } catch (error) {
        alert("Hubo un error al intentar guardar los datos");
      }
    }
  };

  return (
    <div className="m-3">
      {!isLoading && (
        <div className="flex gap-3">
          <button
            onClick={clean}
            className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-20"
          >
            Limpiar
          </button>
          <button
            onClick={save}
            className="px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-20"
          >
            Save
          </button>
        </div>
      )}
      {categories
        .filter((category) => list[category.id] && list[category.id].length > 0)
        .map((category) => (
          <div key={category.id}>
            <h2
              className=" text-xl pl-3 bg-slate-300  m-1"
              onClick={() => toggleCategoryVisibility(category.id)}
            >
              {`${visibleCategories[category.id] ? "ᐃ" : "ᐁ"}  ${
                category.name
              } `}
            </h2>
            <div className="ml-5 flex gap-10">
              <label className="font-bold">Cant</label>
              <label className="font-bold">Medida</label>
              <label className="font-bold">Producto</label>
            </div>
            {visibleCategories[category.id] && (
              <ul>
                {list[category.id]?.map((productList) => (
                  <li
                    className="flex ml-4 bg-slate-100 m-1 items-center gap-10"
                    key={productList.id}
                  >
                    <div className="flex gap-6">
                      <input
                        placeholder={productList.cantidad}
                        className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700  sm:text-sm w-12 text-center"
                        type="number"
                        value={productList.cantidad}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            productList.id,
                            category.id,
                            "cantidad"
                          )
                        }
                      />

                      <input
                        placeholder={productList.medida}
                        className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-700 focus:border-slate-700  sm:text-sm w-20 text-center"
                        type="number"
                        value={productList.medida}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            productList.id,
                            category.id,
                            "medida"
                          )
                        }
                      />
                    </div>
                    <div
                      onClick={() => handleOpenModal(productList)}
                      className={`${
                        productList.comprado === "1"
                          ? "line-through"
                          : "no-underline"
                      } `}
                    >
                      {productList.name}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      {listModal && (
        <BoughtListModal
          isOpen={!!listModal}
          onClose={handleCloseModal}
          idList={listModal.id}
          nameProductList={listModal.name}
          idProduct={listModal.id_product}
          idCategory={listModal.id_category}
          cantidadp={listModal.cantidad}
          medidap={listModal.medida}
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
