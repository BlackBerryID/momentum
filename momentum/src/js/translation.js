const langRuButton = document.querySelector(".lang-ru");
const langEnButton = document.querySelector(".lang-en");
const langButtons = document.querySelectorAll(".lang");

function changeLang() {
  if (!this.classList.contains("active")) {
    if (this === langRuButton) {
      langEnButton.classList.remove("active");
    } else if (this === langEnButton) {
      langRuButton.classList.remove("active");
    }
    this.classList.add("active");
  }
}

langButtons.forEach((item) => {
  item.addEventListener("click", changeLang);
});
