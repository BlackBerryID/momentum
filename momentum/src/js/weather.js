const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

async function getWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=b9d602305123a304901b03555651a15e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
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
window.addEventListener("DOMContentLoaded", getLocalStorage);

getLocalStorage();
getWeather(city.value);

city.addEventListener("change", setCity);
city.addEventListener("keypress", checkKey);
