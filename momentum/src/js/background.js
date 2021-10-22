const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
let randomNum = getRandomNum();

function getRandomNum() {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, 0);
  const bgLink = `https://raw.githubusercontent.com/BlackBerryID/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  const img = new Image();
  img.src = bgLink;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  if (randomNum + 1 > 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum - 1 < 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}

// setBg();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
