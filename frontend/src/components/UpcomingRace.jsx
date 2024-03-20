import React, { useEffect } from "react";
import { RaceCard } from "./RaceCard/RaceCard";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import race_cards from "../data/race_cards.json";
import raceService from "../services/race.service";
import ReactLoading from "react-loading";
import local_storageService from "../services/local_storage.service";
import { required_login } from "../assets";
import IntegrationRequired from "./BackgroundMessage/IntegrationRequired";
import LoginRequired from "./BackgroundMessage/LoginRequired";
import NoData from "./BackgroundMessage/NoData";
import { Datepicker, Pagination } from "flowbite-react";
import { ALERT_TYPE, isEmptyObject, toast } from "../utils/Utility-func";
import { useSelector } from "react-redux";

const UpcomingRace = () => {
  const [races, setRaces] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const { userData } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchData();
  }, []);

  const currentDate = new Date();
  const nextMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 2
  );
  const previousMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate()
  );

  // Total number of pages in your dataset
  const itemsPerPage = 11; // Numbe
  const totalPages = (races?.length / itemsPerPage + 1).toFixed(0);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchDateRelatedData = async (date) => {
    setLoading(true);
    const races = await raceService.getRaceCards(date).catch((err) => {
      setLoading(false);
    });
    setRaces(races);
    setLoading(false);
  };

  const fetchData = async () => {
    try {
      fetchDateRelatedData(formatDate(currentDate));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast("Error fetching race data", ALERT_TYPE.ERROR);
    }
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleTimeChange = (date) => {
    fetchDateRelatedData(formatDate(date));
  };

  return (
    <div>
      <div variants={textVariant()}>
        <h2 className="font-bold text-2xl">Upcoming Races</h2>
      </div>
      <h1
        hidden={isEmptyObject(userData)}
        className="text-xs text-gray-500 text-right"
      >
        {races?.length} Results found.
      </h1>
      <div className="h-10"></div>
      {!isEmptyObject(userData) && (
        <div className="flex items-end justify-end">
          <Datepicker
            minDate={previousMonthDate}
            onSelectedDateChanged={handleTimeChange}
            maxDate={nextMonthDate}
          />
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading
            type="spin"
            color="#0B60B0"
            height={50}
            width={50}
            className="mt-10"
          />
        </div>
      ) : isEmptyObject(userData) ? (
        <div className="mt-20">
          <LoginRequired />
        </div>
      ) : userData?.is_integrated == false ? (
        <div className="mt-20">
          <IntegrationRequired />
        </div>
      ) : (
        races
          .slice(startIndex, startIndex + itemsPerPage)
          .map((race) => <RaceCard race={race} key={race.id_race} />)
      )}

      {races?.length == 0 && loading == false && (
        <div className="mt-20">
          <NoData />
        </div>
      )}
      {races?.length > 0 && loading == false && (
        <div className="flex justify-center items-center mt-16">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
};

export default SectionWrapper(UpcomingRace, "upcomingrace");

// export default UpcomingRace;
