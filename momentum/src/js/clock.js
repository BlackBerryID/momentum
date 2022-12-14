import { showGreeting } from "./greeting";
import { currentLang } from "./translation";

const timePlace = document.querySelector(".time");
const datePlace = document.querySelector(".date");

function showDate() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  let currentDate;
  if (currentLang === "EN") {
    currentDate = date.toLocaleDateString("en-US", options);
  } else if (currentLang === "RU") {
    currentDate = date.toLocaleDateString("ru-RU", options);
  }
  datePlace.textContent = currentDate;
}

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timePlace.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}

showTime();

export { showDate };
