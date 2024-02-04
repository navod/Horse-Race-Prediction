import React from "react";

const InfoCard = ({ title, paragraph, icon }) => {
  return (
    <div
      className="bg-[#0B60B0] shadow-info
     border-2 border-white w-full xl:w-1/3 h-full rounded-xl flex items-center px-4 py-2 justify-between"
    >
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold text-lg lg:text-xl text-white text-center">
          {title}
        </h1>
        <span className="text-xs xl:text-sm lg:text-lg text-white text-center">
          {paragraph}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
