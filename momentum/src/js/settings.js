const settings = document.querySelector(".settings");
const openSettingsButton = document.querySelector(".open-settings");
const settingCheckboxes = document.querySelectorAll(".checkbox");
let state = {
  language: "en",
  photoSource: "github",
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
}

window.addEventListener("beforeunload", setLocalStorage);
openSettingsButton.addEventListener("click", toggleSettings);
settingCheckboxes.forEach((item) =>
  item.addEventListener("change", changeBlocksState)
);

// switch
const switchWrapper = document.querySelector(".switch-wrapper");
