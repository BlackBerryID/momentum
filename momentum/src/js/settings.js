const settings = document.querySelector(".settings");
const openSettingsButton = document.querySelector(".open-settings");

function toggleSettings() {
  if (settings.classList.contains("active")) {
    settings.classList.remove("active");
  } else {
    settings.classList.add("active");
  }
}

openSettingsButton.addEventListener("click", toggleSettings);

// switch
const switchWrapper = document.querySelector(".switch-wrapper");
