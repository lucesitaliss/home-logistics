"use client";
import { createFolderAndSheet } from "@/app/actions/googleDrive";
import { sendEmail } from "@/app/actions/googleDrive";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import RequestFileModal from "./requestFileModal";

function isString(value: any): value is string {
  return typeof value === "string";
}

export default function File() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createFile = async () => {
    setIsLoading(true);
    const create = await createFolderAndSheet(
      "homeLogistic",
      "homeLogisticSheet"
    );

    if (!createFile) {
      throw new Error("Error al configurar las hojas de cálculo");
    }
    create ? setIsLoading(false) : setIsLoading(true);
    isString(create) ? alert("la carpeta ya existe") : "";
  };

  // const requestFile = async () => {
  //   await sendEmail(
  //     "lucesitaliss@gmail.com",
  //     "Solicitud de carpeta ",
  //     "Hola, por favor me puedes compartir la carpeta homeLogistic."
  //   );
  // };
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex flex-col gap-6 pl-3 justify-center items-center h-[30vh]">
      <button
        className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-36"
        onClick={createFile}
      >
        Crear Archivo
      </button>
      <button
        className="p-0.5 border-gray-700 border-2 rounded-md bg-slate-200 w-36"
        onClick={handleOpenModal}
      >
        Solicitar Archivo
      </button>
      <Link href="/logistic">Volver</Link>

      <div className="flex  ">
        <ClipLoader size={50} color={"#123abc"} loading={isLoading} />{" "}
      </div>
      {isModalOpen ? <RequestFileModal /> : ""}
    </div>
  );
}
