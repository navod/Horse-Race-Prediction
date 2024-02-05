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
