import React from "react";
import { TbPlugConnected } from "react-icons/tb";
const IntegrationRequired = () => {
  return (
    <div className="flex flex-col justify-center bg-gray-100 items-center w-full h-96 shadow-md border-2 rounded-xl">
      <TbPlugConnected size={80} className="text-gray-500" />
      <h6 className="text-sm text-gray-600 font-bold mt-10 ">
        Integration Required
      </h6>
    </div>
  );
};

export default IntegrationRequired;
