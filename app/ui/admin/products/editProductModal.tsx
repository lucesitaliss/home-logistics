"use client";

import { useState, SyntheticEvent } from "react";
import { capitalize } from "../../utils/capitalize";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  idProduct: string;
  nameProduct: string;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  idProduct,
  nameProduct,
}) => {
  const [newNameProduct, setNewNameProduct] = useState(nameProduct);

  if (!isOpen) return null;

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      idProduct: idProduct,
      newNameProduct: newNameProduct,
    };
    await fetch("/api/products/edit-name-product", {
      method: "PUT",
      body: JSON.stringify(product),
      headers: {
        "content-Type": "application/json",
      },
    });
    onClose();
    window.location.reload();
  };
  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const nameCategory = capitalize(target.value);
    setNewNameProduct(nameCategory);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Editar Categoria</h2>
        <form onSubmit={handleEditProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <input
              type="text"
              value={newNameProduct}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProductModal;
