import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { getBetSite } from "../../utils/Utility";
import { getRandomColor, getRandomImg } from "../../utils/Utility-func";

const PredictHorseCard = ({ horse }) => {
  return (
    <div>
      <div
        className={`w-full flex-col flex gap-2 shadow-md border-2 rounded-2xl py-4 px-4 border-[#D9D9D9]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div
              style={{ background: getRandomColor() }}
              className="w-16 h-16 rounded-full flex justify-center items-center"
            >
              <img src={getRandomImg()} width="60%" />
            </div>
            <div className="flex flex-col gap-[-1]">
              <span className="font-semibold text-sm md:text-lg">
                {horse.horse}
              </span>
              <span className="text-[#9c9b9b]  text-xs xl:text-sm italic">
                Last Run {horse.last_ran_days_ago} days ago
              </span>
            </div>
          </div>

          <div className="w-14 py-2 px-2 h-full rounded-md bg-[#B7E5B4] items-center flex-col flex justify-center">
            <span className="text-xs text-black">Position</span>
            <span className="font-bold text-black text-2xl">
              {horse.position}
            </span>
          </div>
        </div>

        <Dropdown
          style={{ overflowY: "auto", fontWeight: 700, color: "#0b60b0" }}
          label="Bet your luck..!"
          dismissOnClick={true}
          className="custom-scrollbar"
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
      </div>
    </div>
  );
};

export default PredictHorseCard;
