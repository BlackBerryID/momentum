const settings = document.querySelector(".settings");
const openSettingsButton = document.querySelector(".open-settings");
const settingCheckboxes = document.querySelectorAll(".checkbox");
const sections = document.querySelectorAll("[data-section]");
const settingsContainer = document.querySelector(".settings-container");
let state = {
  language: "EN",
  photoSource: "github",
  imageTag: "",
  blocks: ["time", "date", "greeting", "quote", "weather", "audio", "todolist"],
};

if (!localStorage.getItem("state")) {
  localStorage.setItem("state", JSON.stringify(state));
} else {
  state = JSON.parse(localStorage.getItem("state"));
}

settingCheckboxes.forEach((item) => {
  for (let i = 0; i < state.blocks.length; i++) {
    if (item.dataset.name === `${state.blocks[i]}`) {
      item.checked = true;
    }
  }
});

showHide();

function showHide() {
  sections.forEach((item) => {
    if (state.blocks.includes(item.dataset.section)) {
      item.style.opacity = "1";
      item.style.pointerEvents = "auto";
    } else {
      item.style.opacity = "0";
      item.style.pointerEvents = "none";
    }
  });
}

function setLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

function toggleSettings() {
  if (settings.classList.contains("active")) {
    settings.classList.remove("active");
  } else {
    settings.classList.add("active");
  }
}

function changeBlocksState() {
  if (this.checked) {
    if (!state.blocks.includes(this.dataset.name)) {
      state.blocks.push(this.dataset.name);
    }
  } else {
    let index = state.blocks.findIndex((item) => item === this.dataset.name);
    state.blocks.splice(index, 1);
  }
  showHide();
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("open-settings")) return;
  if (e.path.findIndex((item) => item.className == "settings-container") < 0)
    settings.classList.remove("active");
});
window.addEventListener("beforeunload", setLocalStorage);
openSettingsButton.addEventListener("click", toggleSettings);
settingCheckboxes.forEach((item) =>
  item.addEventListener("change", changeBlocksState)
);

export { state };
