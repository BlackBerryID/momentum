import { data, randomNum, showQuote } from "./quotation";
import { state } from "./settings";
import { getWeather, city } from "./weather";
import { showGreeting } from "./greeting";
import { showDate } from "./clock";

const langRuButton = document.querySelector(".lang-ru");
const langEnButton = document.querySelector(".lang-en");
const langButtons = document.querySelectorAll(".lang");
const settingsMainTitle = document.querySelector(".settings-main-title");
const settingsTitleShow = document.querySelector(".settings-title-show");
const settingsNameTime = document.querySelector(".settings-name-time");
const settingsNameDate = document.querySelector(".settings-name-date");
const settingsNameGreeting = document.querySelector(".settings-name-greeting");
const settingsNameQuotes = document.querySelector(".settings-name-quotes");
const settingsNameWeather = document.querySelector(".settings-name-weather");
const settingsNameAudio = document.querySelector(".settings-name-audio");
const settingsNameTodo = document.querySelector(".settings-name-todo");
const settingsTitleLanguage = document.querySelector(".title-language");

let langFromLocalStorage = JSON.parse(localStorage.getItem("state")).language;
let currentLang = langFromLocalStorage;

let settingsObj = {
  EN: {
    settings: "Settings",
    show: "Show",
    time: "Time",
    date: "Date",
    greeting: "Greeting",
    quotes: "Quotes",
    weather: "Weather",
    audio: "Audio player",
    todo: "Todo",
    language: "Language",
    ru: "Rus",
    en: "Eng",
  },
  RU: {
    settings: "Настройки",
    show: "Показать",
    time: "Время",
    date: "Дата",
    greeting: "Приветствие",
    quotes: "Цитаты",
    weather: "Погода",
    audio: "Аудиоплеер",
    todo: "Список дел",
    language: "Язык",
    ru: "Рус",
    en: "Анг",
  },
};

function changeLangAfterReload() {
  if (currentLang === "RU") {
    changeLang.apply(langRuButton);
  } else if (currentLang === "EN") {
    changeLang.apply(langEnButton);
  }
}

function changeLang() {
  if (!this.classList.contains("active")) {
    if (this === langRuButton) {
      langEnButton.classList.remove("active");
      state.language = "RU";
      currentLang = "RU";
    } else if (this === langEnButton) {
      langRuButton.classList.remove("active");
      state.language = "EN";
      currentLang = "EN";
    }
    this.classList.add("active");
    translateSettings();
  }
}

function translateSettings() {
  settingsMainTitle.textContent = settingsObj[currentLang].settings;
  settingsTitleShow.textContent = settingsObj[currentLang].show;
  settingsNameTime.textContent = settingsObj[currentLang].time;
  settingsNameDate.textContent = settingsObj[currentLang].date;
  settingsNameGreeting.textContent = settingsObj[currentLang].greeting;
  settingsNameQuotes.textContent = settingsObj[currentLang].quotes;
  settingsNameWeather.textContent = settingsObj[currentLang].weather;
  settingsNameAudio.textContent = settingsObj[currentLang].audio;
  settingsNameTodo.textContent = settingsObj[currentLang].todo;
  settingsTitleLanguage.textContent = settingsObj[currentLang].language;
  langRuButton.textContent = settingsObj[currentLang].ru;
  langEnButton.textContent = settingsObj[currentLang].en;
}

langButtons.forEach((item) => {
  item.addEventListener("click", () => {
    changeLang.apply(item);
    showQuote(data, randomNum, currentLang);
    getWeather(city.value);
    showGreeting();
    showDate();
  });
});

changeLangAfterReload();

export { currentLang };
