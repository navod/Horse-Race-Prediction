import React from "react";
import { CiWarning } from "react-icons/ci";

const NoData = () => {
  return (
    <div className="bg-gray-200 shadow-md justify-center items-center w-full h-96 flex flex-col rounded-xl">
      <CiWarning size={100} className="text-gray-700" />
      <h1 className="text-sm text-gray-600 font-bold">No Data</h1>
    </div>
  );
};

export default NoData;
