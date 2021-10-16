import { showGreeting } from "./greeting";

const timePlace = document.querySelector(".time");
const datePlace = document.querySelector(".date");

function showDate() {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-US", options);
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
