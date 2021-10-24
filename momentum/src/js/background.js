import { state } from "./settings";
import {
  setImageFromArrayFlickr,
  setImageFromLinkUnsplash,
  setTheSameImageFromLinkUnsplash,
  getArrayOfImagesFlickr,
} from "./backgroundAPI";

const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const imageSources = document.querySelectorAll(".source");
const imageSourceFlickr = document.querySelector(".source-flickr");
const imageSourceUnsplash = document.querySelector(".source-unsplash");
const imageSourceGithub = document.querySelector(".source-github");
let randomNum = getRandomNum();

function getRandomNum() {
  return Math.floor(Math.random() * (20 - 1 + 1) + 1);
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[Math.floor(hours / 6)];
}

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, 0);
  const bgLink = `https://raw.githubusercontent.com/BlackBerryID/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  const img = new Image();
  img.src = bgLink;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

function getSlideNext() {
  let source = state.photoSource;
  if (source === "github") {
    if (randomNum + 1 > 20) {
      randomNum = 1;
    } else {
      randomNum++;
    }
    setBg();
  } else if (source === "unsplash") {
    setImageFromLinkUnsplash();
  } else if (source === "flickr") {
    setImageFromArrayFlickr(true);
  }
}

function getSlidePrev() {
  let source = state.photoSource;
  if (source === "github") {
    if (randomNum - 1 < 1) {
      randomNum = 20;
    } else {
      randomNum--;
    }
    setBg();
  } else if (source === "unsplash") {
    setImageFromLinkUnsplash();
  } else if (source === "flickr") {
    setImageFromArrayFlickr(true);
  }
}

function changeSource() {
  if (!this.classList.contains("active")) {
    if (this.classList.contains("source-flickr")) {
      state.photoSource = "flickr";
      setImageFromArrayFlickr();
    } else if (this.classList.contains("source-unsplash")) {
      state.photoSource = "unsplash";
      setTheSameImageFromLinkUnsplash();
    } else if (this.classList.contains("source-github")) {
      state.photoSource = "github";
      setBg();
    }
    imageSources.forEach((image) => image.classList.remove("active"));
    this.classList.add("active");
  }
}

function loadSource() {
  let source = state.photoSource;
  if (source === "github") {
    changeSource.apply(imageSourceGithub);
  } else if (source === "flickr") {
    changeSource.apply(imageSourceFlickr);
  } else if (source === "unsplash") {
    changeSource.apply(imageSourceUnsplash);
  }
}

loadSource();

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
imageSources.forEach((item) => item.addEventListener("click", changeSource));

// image tag
const tagInput = document.querySelector(".tag-input");
if (state.imageTag) tagInput.value = state.imageTag;

async function setTag() {
  state.imageTag = tagInput.value;
  localStorage.setItem("state", JSON.stringify(state));
  let source = state.photoSource;
  if (source === "flickr") {
    await getArrayOfImagesFlickr();
    setImageFromArrayFlickr(true);
  } else if (source === "unsplash") {
    setImageFromLinkUnsplash();
  }
}

function checkKey(e) {
  if (e.code === "Enter") {
    tagInput.blur();
  }
}

tagInput.addEventListener("change", setTag);
tagInput.addEventListener("keypress", checkKey);

export { getTimeOfDay };
