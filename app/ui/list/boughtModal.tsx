"use client";
import { bought } from "@/app/actions/list";
import { useState } from "react";

interface ListModalProps {
  isOpen: boolean;
  onClose: () => void;
  idList: string;
  nameProductList: string;
}

const BoughtListModal: React.FC<ListModalProps> = ({
  isOpen,
  onClose,
  idList,
  nameProductList,
}) => {
  const [cantidad, setCantidad] = useState("");
  const [medida, setMedida] = useState("");
  const [precio, setPrecio] = useState("");

  const handleClick = async () => {
    await bought(idList, cantidad, medida, precio);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="flex gap-3 justify-center">
          <h2>{nameProductList}</h2>
          <input
            placeholder="Cant"
            type="text"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-12"
          ></input>
          <input
            placeholder="Medida"
            type="text"
            value={medida}
            onChange={(e) => setMedida(e.target.value)}
            className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-20"
          ></input>
          <input
            placeholder="Precio"
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-20"
          ></input>
          <button
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleClick}
          >
            {" "}
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoughtListModal;
