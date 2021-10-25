import { currentLang } from "./translation";
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${currentLang}&appid=b9d602305123a304901b03555651a15e&units=metric`;
  const res = await fetch(url);
  if (res.status == 404) {
    weatherDescription.textContent = "";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherIcon.className = "weather-icon owf";
    if (currentLang === "RU") {
      weatherError.textContent = `Нет прогноза погоды для города '${cityName}'`;
    } else if (currentLang === "EN") {
      weatherError.textContent = `There is no weather forecast for '${cityName}'`;
    }
    return;
  }
  const data = await res.json();
  weatherError.textContent = "";
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (currentLang === "RU") {
    wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`;
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
    if (city.value.toLowerCase() == "minsk") city.value = "Минск";
  } else if (currentLang === "EN") {
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    if (city.value.toLowerCase() == "минск") city.value = "Minsk";
  }
}

function setCity() {
  localStorage.setItem("city", city.value);
  getWeather(city.value);
}

function checkKey(e) {
  if (e.code === "Enter") {
    setCity();
    city.blur();
  }
}

function setLocalStorage() {
  localStorage.setItem("city", city.value);
}

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("DOMContentLoaded", () => {
  getLocalStorage();
  getWeather(city.value);
  console.log(city.value);
});

city.addEventListener("change", setCity);
city.addEventListener("keypress", checkKey);

export { getWeather, city };
