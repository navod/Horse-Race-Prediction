import React from "react";
import { raceResultBackground } from "../../assets";
import { styles } from "../../styles";
import HorseCard from "../../components/HorseCard/HorseCard";
import { TbBulb } from "react-icons/tb";
import Modal from "react-modal";
import PredictDetail from "../../components/PredictDetail/PredictDetail";
import predict_data from "../../data/predict_detail.json";
import race_data from "../../data/race_details.json";
import moment from "moment";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const RaceDetail = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={`mt-20`}>
      <img
        src={raceResultBackground}
        className="w-full h-52 bg-cover object-cover bg-no-repeat bg-center"
      />
      <div className={`${styles.paddingX}`}>
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center gap-3 mt-10">
            <svg
              viewBox="0 0 250 250"
              focusable="false"
              className="chakra-icon css-1xb2pdo"
              aria-label="Thoroughbred"
              width={"70"}
              height={"70"}
            >
              <path
                fill="#ec018c"
                d="m250,133.83c-39.35-24.95-83.98,9.05-127.36,22.19-2.8-7.7-6.4-17.89-5.75-21.21.66-3.39,5.58-5.71,7.97-6.99,3.86-2.08,8.64-4.56,12.01-7.51,4.78-4.19,7.16-10.71,11.47-15.25.96-1.02,2.24-1.78,3.61-1.8,2.64-.03,11.39,5.75,14.04,6.8,5.16,2.03,10.47,4.1,15.92,5.12,1.11.21,2.32.38,3.56.53-18.34,6.82-37.15,15.85-53.83,10.75l.11.21c28.52,23.48,73.36-24.38,103.87-9.21-11.01-9.82-23.69-9.64-36.98-6.08-5.78-.87-11.51-2.05-17.12-3.78-11.95-3.69-20.2-11.57-31.08-17.16-8.73-4.48-20.42-9.1-32.16-11.07-7.98-1.34-14.71-1.64-20.36-1.32.28-.68.54-1.4.78-2.16,1.37-4.37,1.55-10.04,1.69-11.57-.32.16-1.64.92-1.83,1.03-1.38.77-15.23,9.84-18.41,10.65-8.09,2.06-16.57,5.73-23.5,10.99-10.22,7.76-18.5,21.11-26.61,31.1-5.73,7.07-11.94,14-17.16,21.5C8.42,145.97-.1,151.56,0,160.31c.05,4.05,2.42,11.26,7.18,11.43,5.44.2,7,3.45,14.57,5.73,7.58,2.28,10.33-19.41,38.48-21.69,20.14-1.63,26.26-5.78,28.37-7.72,5.01-4.6,11.17-2.03,14.88,2.71,2.15,2.75,4.07,5.62,5.92,8.53-8.95,1.67-17.82,2.1-26.54.56l.2.28c9.82,5.72,20.27,7.46,31.12,6.73,1.83,2.87,3.73,5.7,5.87,8.41,1.7,2.13,3.47,4.15,5.54,6.04,1.05.93,2.18,1.79,3.39,2.62,4.87,3.36,10.25,3.35,15.22.13,5.67-3.67,10.61-8.71,16-12.82,1.94-1.47,3.88-2.92,5.91-4.21,2.03-1.28,4.1-2.48,6.27-3.49,4.33-2.02,9.03-3.31,13.93-3.84-4.87-.73-9.97-.37-14.87.95-7.48,2.02-14.23,6.73-20.8,11.16-5.39,3.63-16.05,14.09-22.02,6.94-2.52-3.01-1.3-7.43-2.82-13.52,41.05-8.52,86.39-43.91,124.19-31.41Z"
              ></path>
            </svg>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
              contentLabel="Predict Modal"
            >
              <PredictDetail
                onClose={closeModal}
                horses={predict_data.horses}
              />
            </Modal>
            <div className="flex flex-col">
              <h2 className="capitalize font-bold text-black text-lg">
                {race_data.title}
              </h2>
              <span className="text-sm text-black font-semibold">
                {race_data.course} -{" "}
                {moment(race_data.date).format("dddd DD MMMM YYYY, HH:mm")}
              </span>
            </div>
          </div>
          <div
            onClick={openModal}
            className="flex py-4 flex-row hover:bg-[#FBBD7D] cursor-pointer bg-[#FFA447] gap-2 px-4 h-full justify-center items-center rounded-xl"
          >
            <TbBulb size={30} color="white" />
            <div className="font-semibold space-3 text-white tracking-wide">
              PREDICT
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F5] rounded-lg py-8 px-5 flex flex-col gap-4 mt-10">
          <h2 className="font-bold text-lg">Race information</h2>
          <div className="flex justify-between">
            <div className="flex gap-16">
              <span className="text-sm font-bold">Distance</span>
              <span className="text-sm ">{race_data.distance}</span>
            </div>

            <div className="flex gap-16">
              <span className="text-sm font-bold">Prize</span>
              <span className="text-sm ">{race_data.prize}</span>
            </div>

            <div className="flex gap-16">
              <span className="text-sm font-bold">Age</span>
              <span className="text-sm">{race_data.age}</span>
            </div>

            <div className="flex gap-16">
              <span className="text-sm font-bold">finish_time</span>
              <span className="text-sm">
                {race_data.finish_time ? race_data.finish_time : "-"}
              </span>
            </div>

            <div className="flex gap-16">
              <span className="text-sm font-bold">finished</span>
              <span className="text-sm">{race_data.finished}</span>
            </div>
          </div>
        </div>
        <div className="h-10"></div>
        <div className="mt-10">
          <h2 className="font-bold text-2xl">Horse Details</h2>
        </div>
        <div className="h-10"></div>
        <div className="grid grid-cols-4 gap-3">
          {race_data.horses.map((horse) => (
            <HorseCard horse={horse} key={horse.id_horse} />
          ))}
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default RaceDetail;
