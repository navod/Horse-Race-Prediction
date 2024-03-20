import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  getLastForm,
  getRandomColor,
  getRandomImg,
  getRandomJockey,
  isCanPredict,
} from "../../utils/Utility-func";

import { Dropdown } from "flowbite-react";
import { getBetSite } from "../../utils/Utility";
import { Link } from "react-router-dom";
const HorseCard = ({ horse, race_date }) => {
  return (
    <div>
      <div
        className={`flex-col flex gap-2 shadow-md border-2 rounded-2xl py-4 px-4 border-[#D9D9D9]`}
      >
        <div className="flex flx-row gap-4 justify-end">
          {horse.position && (
            <div className="flex items-center gap-1">
              <span className="text-sm">Position</span>
              <div className="w-8 h-8 rounded-full bg-[#B7E5B4] items-center flex justify-center">
                <span className="font-bold text-white">{horse.position}</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-1">
            <span className="text-sm">Age</span>
            <div className="w-8 h-8 rounded-full bg-[#F28585] items-center flex justify-center">
              <span className="font-bold text-white">{horse.age}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div
            style={{ background: getRandomColor() }}
            className={`w-16 h-16 rounded-full flex justify-center items-center`}
          >
            <img src={getRandomImg()} width={40} />
          </div>
          <div className="flex flex-col gap-[-1]">
            <span className="font-semibold text-lg">{horse.horse}</span>
            <span className="text-[#9c9b9b] text-sm italic">
              Last Run {horse.last_ran_days_ago} days ago
            </span>
          </div>
        </div>
        <div className="bg-[#F5F5F5] flex px-4 py-3 mt-4 rounded-xl justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 flex justify-center items-center">
              <img src={getRandomJockey()} />
            </div>
            <div className="flex flex-col gap-3 xl:gap-1">
              <div className="flex xl:gap-2 xl:flex-row flex-col">
                <span className="text-sm">Jockey: </span>
                <span className="font-bold text-sm">{horse.jockey}</span>
              </div>
              <div className="flex xl:gap-2 xl:flex-row flex-col">
                <span className="text-sm">Trainer: </span>
                <span className="font-bold text-sm">{horse.trainer}</span>
              </div>
            </div>
          </div>

          <div className="w-12 max-h-fit bg-[#40A2D8] shadow-md rounded-md flex flex-col justify-center items-center">
            <span className="text-xs text-white">No</span>
            <span className="text-white font-bold text-lg">{horse.number}</span>
          </div>
        </div>
        <div className="bg-[#F5F5F5] flex px-4 py-3 rounded-xl w-full  justify-between">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-sm">Owner :</span>
            <span className="font-bold text-sm truncate max-w-xs">
              {horse.owner ? horse.owner : "-"}
            </span>
          </div>
        </div>
        <div className="bg-[#F5F5F5] flex px-4 py-3 rounded-xl  justify-between">
          <div className=" flex gap-4 w-full flex-col lg:flex-col xl:flex-row md:flex-row xl:items-center">
            <span className="text-sm">Last Form :</span>
            <div className="flex justify-between xl:justify-normal xl:gap-3 md:gap-1">
              {getLastForm(horse.form).map((result, index) => (
                <span
                  key={index}
                  className="bg-[#B7E5B4] w-7 text-center justify-center rounded-md h-7
  font-bold text-sm flex items-center"
                >
                  {result}
                </span>
              ))}
            </div>
          </div>
        </div>
        {isCanPredict(race_date) && (
          <Dropdown
            style={{ fontWeight: 700, color: "#0b60b0" }}
            label="Bet your luck..!"
            dismissOnClick={true}
          >
            {horse.odds.map((odd, index) => (
              <div key={index}>
                <Link to={odd.url} target="_blank">
                  <Dropdown.Item>{getBetSite(odd)}</Dropdown.Item>
                </Link>
                <hr />
              </div>
            ))}
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default HorseCard;
