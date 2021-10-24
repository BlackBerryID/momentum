import { getTimeOfDay } from "./background";
import { state } from "./settings";

const body = document.querySelector("body");

// Unsplash API
let newImageLinkUnsplash;

async function getLinkToImageUnsplash() {
  const timeOfday = getTimeOfDay();
  let tag = timeOfday;
  let localState = JSON.parse(localStorage.getItem("state"));
  if (localState.imageTag) tag = localState.imageTag;
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=N21RyhNTXpLe9wVtTjhTyIPYr4JFXcnq-uE-g045J9g`;
  const res = await fetch(url);
  const data = await res.json();
  newImageLinkUnsplash = `url(${data.urls.regular})`;
}

function setImageFromLinkUnsplash() {
  getLinkToImageUnsplash().then(() => {
    body.style.backgroundImage = newImageLinkUnsplash;
  });
}

function setTheSameImageFromLinkUnsplash() {
  if (newImageLinkUnsplash) {
    body.style.backgroundImage = newImageLinkUnsplash;
  } else if (!newImageLinkUnsplash) {
    setImageFromLinkUnsplash();
  }
}

// Flickr API

let arrayOfImagesFlickr;
let randomNum = getRandomNum();
let currentTimeOfDay;

function getRandomNum() {
  return Math.floor(Math.random() * (99 - 0 + 1) + 0);
}

async function getArrayOfImagesFlickr() {
  const timeOfday = getTimeOfDay();
  currentTimeOfDay = timeOfday;
  let tag = timeOfday;
  let localState = JSON.parse(localStorage.getItem("state"));
  if (localState.imageTag) tag = localState.imageTag;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd1acdb41d477138cf1a2d813c3a1357&tag_mode=all&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  arrayOfImagesFlickr = data.photos.photo;
}

async function setImageFromArrayFlickr(isDifferentImage) {
  const timeOfday = getTimeOfDay();
  if (isDifferentImage) randomNum = getRandomNum();
  if (arrayOfImagesFlickr && currentTimeOfDay === timeOfday) {
    let path = await arrayOfImagesFlickr[randomNum]["url_l"];
    let url = `url(${path}`;
    body.style.backgroundImage = url;
  } else {
    getArrayOfImagesFlickr().then(
      (data) =>
        (body.style.backgroundImage = `url(${arrayOfImagesFlickr[randomNum]["url_l"]}`)
    );
  }
}

export {
  setImageFromLinkUnsplash,
  setImageFromArrayFlickr,
  setTheSameImageFromLinkUnsplash,
  getArrayOfImagesFlickr,
};
