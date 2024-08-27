"use client";
import { createFolderAndSheet } from "@/app/actions/googleDrive";
import { ClipLoader } from "react-spinners";
import { useState, useRef } from "react";
import RequestFileModal from "./requestFileModal";
import Link from "next/link";

function isString(value: any): value is string {
  return typeof value === "string";
}

export default function File() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const linkRef = useRef<HTMLAnchorElement>(null);

  const createFile = async () => {
    setIsLoading(true);

    try {
      const create = await createFolderAndSheet(
        "homeLogistic",
        "homeLogisticSheet"
      );

      if (!create) {
        throw new Error("Error al configurar las hojas de cálculo");
      }

      if (typeof create === "string") {
        setIsLoading(false);
        alert("La carpeta ya existe");
      } else {
        // Lógica si se creó la carpeta y el archivo correctamente
        setIsLoading(false);
        linkRef.current?.click();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-6 pl-3 justify-center items-center h-[30vh]">
      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-40"
        onClick={createFile}
      >
        Crear Archivo
      </button>
      <button
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 w-40"
        onClick={handleOpenModal}
      >
        Solicitar Archivo
      </button>

      <div className="flex  ">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />{" "}
      </div>
      {isModalOpen && (
        <RequestFileModal isOpen={isModalOpen} onClose={handleClose} />
      )}
      <Link href="/">Salir</Link>
      <Link href="/logistic" ref={linkRef} style={{ display: "none" }} />
    </div>
  );
}
