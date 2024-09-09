"use client";
import { bought } from "@/app/actions/list";
import { useState } from "react";

const BoughtListModal: React.FC = () => {
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");

  const handleClick = async () => {
    await bought("3", 2.5, 3600);
  };
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="flex gap-3 justify-center">
          <input
            placeholder="Unidad"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-16"
          ></input>
          <input
            placeholder="Precio"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 block border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-16"
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
