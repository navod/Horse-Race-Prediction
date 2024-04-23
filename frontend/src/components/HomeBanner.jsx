import React from "react";
import { styles } from "../styles";
import InfoCard from "./InfoCard/InfoCard";

const HomeBanner = () => {
  return (
    <section className="relative w-full xl:h-screen h-[900px] md:h-[850px] lg:h-[670px] mx-auto mt-10">
      <div className="relative w-full xl:h-screen h-[900px] md:h-[850px] lg:h-[670px] mx-auto bg-black opacity-75"></div>

      <div
        className={`${styles.paddingX} absolute inset-0 md:top-[120px] top-20 max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col xl:flex-row justify-between gap-10">
          <div>
            <div>
              <h1 className={`${styles.heroHeadText} text-center`}>
                Welcome to{" "}
                <span className="text-[#0B60B0]" data-testid="cypress-title">
                  TurboRace Insight
                </span>
              </h1>

              <p
                className={`${styles.heroSubText} mt-2 text-white-100 text-center`}
              >
                Unleashing Predictive Prowess in Horse Racing!
                <br className="sm:block hidden" />
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:flex justify-center xl:flex-row p-5 rounded-xl container-shadow w-[85%] xl:w-[90%]  xl:h-[160px] absolute bottom-8 gap-6 xl:gap-12">
          <InfoCard
            title="#Tomorrow's Winners"
            paragraph="Unlock tomorrow's champions with confidence – every prediction redefines horse racing!"
            icon={null}
          />
          <InfoCard
            title="#Race Recap"
            paragraph="Relive recent races with detailed recaps, capturing drama and triumphs!"
            icon={null}
          />
          <InfoCard
            title="#Upcoming Races Winners"
            paragraph="Gear up for tomorrow's races with top-tier horses and excitement!"
            icon={null}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
