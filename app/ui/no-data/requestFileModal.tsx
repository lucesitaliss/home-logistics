"use cliente";

import { useState } from "react";

interface RequestFileModal {
  isOpen: boolean;
  onClose: () => void;
  sendEmail: (to: string, subject: string, message: string) => void;
}

const RequestFileModal = () => {
  // const [email, setEmail] = useState("");
  // const [menssage, setMessage] = useState("");

  // if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full"></div>
    </div>
  );
};

export default RequestFileModal;
