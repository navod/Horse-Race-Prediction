import React, { useEffect } from "react";
import { RaceCard } from "./RaceCard/RaceCard";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import race_cards from "../data/race_cards.json";
const UpcomingRace = () => {
  const [races, setRaces] = React.useState([]);

  useEffect(() => {
    setRaces(race_cards);
  }, []);

  return (
    <div>
      <div variants={textVariant()}>
        <h2 className="font-bold text-2xl">Upcoming Races</h2>
      </div>
      <div className="h-10"></div>

      {races.map((race) => (
        <RaceCard race={race} key={race.id_race} />
      ))}
    </div>
  );
};

export default SectionWrapper(UpcomingRace, "upcomingrace");

// export default UpcomingRace;
