import React from "react";
import SectionWrapper from "../../hoc/SectionWrapper";
import { projectInfoBackground } from "../../assets";
import { textVariant } from "../../utils/motion";

const HomeDescription = () => {
  return (
    <div>
      <div variants={textVariant()} className="mt-[-100px] mb-20">
        <h2 className="font-bold text-2xl">About</h2>
      </div>
      <div className="rounded-md bg-[#F5F5F5] p-6 flex flex-col lg:flex-row w-full gap-10">
        <div className="flex flex-col gap-10">
          <h1 className="font-bold text-xl">
            TurboTrack Triumph: Elevate Your Horse Racing Experience with
            Precision Predictions
          </h1>
          <p>
            Embark on a journey into the thrilling world of horse racing with
            TurboTrack Triumph – your exclusive gateway to cutting-edge
            predictions and expert insights. Our machine learning algorithms,
            finely tuned for the turf, meticulously analyze race dynamics,
            jockey performance, and equine prowess to deliver unparalleled
            accuracy in predicting winners. From the heart-pounding Derby to the
            swift steeds of everyday races, we bring you the horse racing oracle
            you've been waiting for. Join us as we redefine the equestrian
            experience, one winning prediction at a time. It's not just a race;
            it's a revelation. Get ready to gallop into a new era of triumphant
            foresight with TurboTrack Triumph!
          </p>
        </div>
        <div className="w-[100%] lg:w-[220%] xl:w-[100%] max-h-full bg-[#40A2D8] rounded-xl flex justify-center items-center">
          <img src={projectInfoBackground} className="object-contain w-[80%]" />
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(HomeDescription, "homedescription");
