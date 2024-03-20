import { Link } from "react-router-dom";
import {
  bet10,
  bet365,
  betway,
  boylesports,
  ladbrokes,
  sport888,
  unibet,
} from "../assets";

export const getBetSite = (bet) => {
  switch (bet.bookie.toLowerCase()) {
    case "bet365":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={bet365} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );

    case "betway":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={betway} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );

    case "unibet":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={unibet} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );
    case "888sport":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={sport888} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );

    case "boylesports":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={boylesports} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );
    case "10bet":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={bet10} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );

    case "ladbrokes":
      return (
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3 items-center">
            <div className="rounded-full justify-center flex items-center w-10 h-10">
              <img src={ladbrokes} />
            </div>
            <span className="text-black font-bold">{bet.bookie}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs italic">Last Updated Time</span>
            <span className="text-xs">{bet.last_update}</span>
          </div>
        </div>
      );
  }
};
