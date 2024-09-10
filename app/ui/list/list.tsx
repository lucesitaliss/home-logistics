"use client";
import { getList } from "@/app/actions/list";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import BoughtListModal from "./boughtModal";

interface List {
  id: string;
  id_product: string;
  name: string;
  id_category: string;
  cantidad: string;
  medida: string;
  precio: string;
  total: string;
  comprado: string;
}

export default function List() {
  useEffect(() => {
    fetchList();
  }, []);

  const [list, setList] = useState<List[]>([]);
  const [listModal, setLisModal] = useState<List | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchList() {
    const dataFechList = await getList();
    if (dataFechList) {
      setList(dataFechList);
      setIsLoading(false);
    }
  }
  const handleOpenModal = (list: List) => {
    setLisModal(list);
  };

  const handleCloseModal = () => {
    setLisModal(null);
  };

  return (
    <div>
      {list.map((productList) => (
        <div key={productList.id} onClick={() => handleOpenModal(productList)}>
          {productList.name}
        </div>
      ))}

      {listModal && (
        <BoughtListModal
          isOpen={!!listModal}
          onClose={handleCloseModal}
          idList={listModal.id}
          nameProductList={listModal.name}
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
