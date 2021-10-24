import { currentLang } from "./translation";

const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

// greeting

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  let greetingText;
  if (currentLang === "EN") {
    greetingText = `Good ${timeOfDay}`;
    name.placeholder = "[Enter name]";
  } else if (currentLang === "RU") {
    if (timeOfDay === "morning") {
      greetingText = `Доброе утро`;
    } else if (timeOfDay === "afternoon") {
      greetingText = `Добрый день`;
    } else if (timeOfDay === "evening") {
      greetingText = `Добрый вечер`;
    } else if (timeOfDay === "night") {
      greetingText = `Доброй ночи`;
    }
    name.placeholder = "[Введите имя]";
  }
  greeting.textContent = greetingText;
}

// name

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("DOMContentLoaded", getLocalStorage);

export { showGreeting };
