import React from "react";
import { IoClose } from "react-icons/io5";
import PredictHorseCard from "../HorseCard/PredictHorseCard";

const PredictDetail = ({ onClose, horses }) => {
  return (
    <div className=" overflow-y-auto h-full custom-scrollbar">
      <div className="px-4 py-4">
        <div className="flex justify-between mb-10 gap-4 items-center">
          <h1 className="font-bold text-lg">
            Tomorrow's Winning Trio: Meet the Top Horses Set for Glory!
          </h1>
          <div className="flex justify-end ">
            <IoClose size={30} onClick={onClose} className="cursor-pointe" />
          </div>
        </div>

        <div className="flex gap-4 flex-col">
          {horses.map((horse) => (
            <PredictHorseCard horse={horse} key={horse.id_horse} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictDetail;
