const body = document.querySelector("body");

// Unsplash API
let newImageLinkUnsplash;

async function getLinkToImageUnsplash() {
  const url =
    "https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=N21RyhNTXpLe9wVtTjhTyIPYr4JFXcnq-uE-g045J9g";
  const res = await fetch(url);
  const data = await res.json();
  newImageLinkUnsplash = `url(${data.urls.regular})`;
}

function setImageFromLinkUnsplash() {
  getLinkToImageUnsplash().then((data) => {
    body.style.backgroundImage = newImageLinkUnsplash;
  });
}

// setImageFromLinkUnsplash();

// Flickr API

let arrayOfImagesFlickr;
let randomNum = getRandomNum();

function getRandomNum() {
  return Math.floor(Math.random() * (99 - 0 + 1) + 0);
}

async function getArrayOfImagesFlickr() {
  const url =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=dd1acdb41d477138cf1a2d813c3a1357&tags=nature&extras=url_l&format=json&nojsoncallback=1";
  const res = await fetch(url);
  const data = await res.json();
  arrayOfImagesFlickr = data.photos.photo;
  console.log(arrayOfImagesFlickr);
}

// if (arrayOfImagesFlickr) {
//   setImageFromArrayFlickr();
//   console.log("YES");
// } else {
//   getArrayOfImagesFlickr().then((data) => setImageFromArrayFlickr());
//   console.log("NO");
// }

function setImageFromArrayFlickr() {
  console.log(arrayOfImagesFlickr[randomNum]["url_l"]);
  body.style.backgroundImage = `url(${arrayOfImagesFlickr[randomNum]["url_l"]}`;
}
