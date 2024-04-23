import React from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { rapidapi } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { VscDebugDisconnect } from "react-icons/vsc";
import { ALERT_TYPE, isEmptyObject, toast } from "../utils/Utility-func";

const RapidAPIConnect = () => {
  const { userData } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const isIntegrate = () => {
    if (isEmptyObject(userData)) {
      toast("Please login before integrate account", ALERT_TYPE.WARNING);
    } else {
      navigate("/integration");
    }
  };

  const navigateToRapidApi = () => {
    window.open("https://rapidapi.com/ortegalex/api/horse-racing/", "_blank");
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-[#D6D6D6] p-6 rounded-xl md:gap-5 gap-14 shadow-md">
      <div className="flex flex-col gap-5 md:items-start md:gap-0 items-center">
        <img src={rapidapi} className="w-40 object-contain" />
        <p className="text-base mt-4">
          To access our horse race details fetching service, please provide your
          RapidAPI key below. If you don't have a RapidAPI key yet, you can sign
          up for free at{" "}
          <span
            className="font-bold text-[#0B60B0] cursor-pointer"
            onClick={navigateToRapidApi}
          >
            RapidAPI.com
          </span>
        </p>
      </div>
      {userData?.is_integrated ? (
        <button
          data-testid="disconnect-button"
          onClick={isIntegrate}
          className="bg-[#2CA141] px-6 h-12 rounded-md text-white shadow-md flex gap-2 justify-center items-center"
        >
          <h1 className="font-semibold">Connected</h1>
          <TiTick />
        </button>
      ) : (
        <button
          onClick={isIntegrate}
          data-testid="connect-button"
          className="bg-[#0B60B0] px-6 h-12 rounded-md text-white shadow-md flex gap-2 justify-center items-center"
        >
          <h1 className="font-semibold">Connect</h1>

          <VscDebugDisconnect />
        </button>
      )}
    </div>
  );
};

export default SectionWrapper(RapidAPIConnect, "rapidapiconnect");
