"use client";
import { getList } from "@/app/actions/list";
import { useState, useEffect } from "react";

interface List {
  id: string;
  id_product: string;
  name: string;
  id_category: string;
  unidad: string;
  precio: string;
  total: string;
  comprado: string;
}

export default function List() {
  useEffect(() => {
    fetchList();
  }, []);

  const [list, setList] = useState<List[]>([]);
  const [listModal, setLisModal] = useState(null);

  async function fetchList() {
    const dataFechList = await getList();
    if (dataFechList) {
      setList(dataFechList);
    }
  }

  return (
    <div>
      {list.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
