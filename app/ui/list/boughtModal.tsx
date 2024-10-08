"use client";
import { useState } from "react";
import { IList } from "@/app/lib/types";

interface ListModalProps {
  isOpen: boolean;
  onClose: (updateList: IList | null) => void;
  idList: string;
  nameProductList: string;
  idProduct: string;
  idCategory: string;
  cantidadp: string;
  medidap: string;
}

const BoughtListModal: React.FC<ListModalProps> = ({
  isOpen,
  onClose,
  idList,
  nameProductList,
  idProduct,
  idCategory,
  cantidadp,
  medidap,
}) => {
  if (!isOpen) return null;

  const [cantidad, setCantidad] = useState<number | string>(cantidadp);
  const [medida, setMedida] = useState<number | string>(medidap);
  const [precio, setPrecio] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (
      isNaN(Number(cantidad)) ||
      isNaN(Number(medida)) ||
      isNaN(Number(precio))
    ) {
      alert("Por favor, ingresa valores numéricos válidos.");
      return;
    }
    setIsLoading(true);

    try {
      const propsBought = {
        idList,
        cantidad,
        medida: Number(medida),
        precio: Number(precio),
      };
      await fetch("/api/list/set-bought", {
        method: "PUT",
        body: JSON.stringify(propsBought),
        headers: {
          "content-Type": "application/json",
        },
      });

      const updateList = {
        id: idList,
        id_product: idProduct,
        name: nameProductList,
        id_category: idCategory,
        cantidad: cantidad.toString(),
        medida: medida.toString(),
        precio: precio.toString(),
        precioTotal: "",
        precioKg: "",
        kgTotal: "",
        comprado: "1",
      };
      setIsLoading(false);
      onClose(updateList);
    } catch (error) {
      alert("Hubo un error al intentar guardar los datos");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xs w-full">
        {isLoading ? (
          <h2 className="flex text-lg justify-center">Cargando ...</h2>
        ) : (
          <div className="flex flex-col items-center justify-start ">
            <div className="flex items-center justify-start p-3 gap-3">
              <h2 className="text-lg">{nameProductList}</h2>
              <button
                className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => onClose(null)}
                disabled={isLoading}
              >
                X
              </button>
            </div>
            <div className="flex gap-3 p-4">
              <div className="flex flex-col items-center">
                <label>Cant</label>
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-700  focus:border-slate-700  sm:text-sm w-12"
                ></input>
              </div>

              <div className="flex flex-col items-center">
                <label>Medida</label>
                <input
                  type="number"
                  value={medida}
                  onChange={(e) => setMedida(e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-700  focus:border-slate-700  sm:text-sm w-[85px]"
                ></input>
              </div>

              <div className="flex flex-col items-center">
                <label>Precio</label>
                <input
                  placeholder="Precio"
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-20"
                ></input>
              </div>

              <div className="flex items-end">
                <button
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={handleClick}
                  disabled={isLoading}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoughtListModal;
