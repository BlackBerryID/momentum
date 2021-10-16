const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");

// greeting

function showGreeting() {
  const date = new Date();
  const hours = date.getHours();

  function getTimeOfDay() {
    const timeOfDay = ["night", "morning", "afternoon", "evening"];
    return timeOfDay[Math.floor(hours / 6)];
  }

  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
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
