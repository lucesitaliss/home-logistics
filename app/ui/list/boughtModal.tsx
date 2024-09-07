"use client";
import { bought } from "@/app/actions/list";

const BoughtList: React.FC = () => {
  const handleClick = async () => {
    await bought("3", 2.5, 3600);
  };
  return (
    <div>
      <button onClick={handleClick}> Ok</button>
    </div>
  );
};

export default BoughtList;
