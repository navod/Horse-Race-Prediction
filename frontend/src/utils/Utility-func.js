import {
  horse1,
  horse2,
  horse3,
  horse4,
  horse5,
  jockey1,
  jockey2,
  jockey3,
  jockey4,
  jockey5,
  jockey6,
  jockey7,
} from "../assets";
import { toast as notify } from "react-toastify";

export const getLastForm = (expression) => {
  const startIndex = 0;
  const endIndex = 5;

  const numbersArray = [];

  for (let i = startIndex; i < endIndex; i++) {
    if (!isNaN(expression[i])) {
      numbersArray.push(Number(expression[i]));
    } else {
      numbersArray.push(expression[i]);
    }
  }
  return numbersArray;
};

export const getRandomColor = () => {
  const letters = "89ABCDEF"; // Use lighter color hex values
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

export const getRandomImg = () => {
  const images = [horse1, horse2, horse3, horse4, horse5];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export const getRandomJockey = () => {
  const images = [
    jockey1,
    jockey2,
    jockey3,
    jockey4,
    jockey5,
    jockey6,
    jockey7,
  ];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

export const ALERT_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warn",
};

export const ALERT_COLOR = {
  error: "#ff3f34",
  success: "#05c46b",
  warn: "#ffd32a",
};

export const toast = (text, type) =>
  notify(text, {
    type,
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    // className: css({
    //   background: '#00FF00 !important',
    //   color: 'white !important',
    //   fontWeight: 'bold',
    // }),
    icon: false,
    style: { backgroundColor: ALERT_COLOR[type], color: "white" },
  });
export const isEmptyObject = (obj) => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

export const isCanPredict = (date) => {
  if (!date) return false;
  const current_date = new Date();
  const race_date = new Date(date.split(" ")[0]);
  return true;
  // if (race_date >= current_date) {
  //   console.log("Race date is greater than current date.");
  //   return true;
  // } else if (race_date <= current_date) {
  //   console.log("Race date is less than current date.");
  //   return false;
  // } else {
  //   return true;
  //   console.log("Race date is equal to current date.");
  // }
};
