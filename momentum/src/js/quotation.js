import { currentLang } from "./translation";
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuoteButton = document.querySelector(".change-quote");

let randomNum;
let data;

function getRandomNum() {
  return Math.floor(Math.random() * (9 - 0 + 1) + 0);
}

async function getQuotes() {
  // prevent duplication of quotes
  let tempNum;
  do {
    tempNum = getRandomNum();
  } while (tempNum == randomNum);
  randomNum = tempNum;

  const quotes = "../json/quotations.json";
  const res = await fetch(quotes);
  data = await res.json();
  showQuote(data, randomNum, currentLang);
}

function showQuote(data, randomNum, lang) {
  quote.textContent = '"' + data[randomNum][`text${lang}`] + '"';
  author.textContent = data[randomNum][`author${lang}`];
}

function setLocalStorage() {
  localStorage.setItem("quote", randomNum);
}

function getLocalStorage() {
  if (localStorage.getItem("quote")) {
    randomNum = +localStorage.getItem("quote");
  }
}

getLocalStorage();
getQuotes();

changeQuoteButton.addEventListener("click", getQuotes);

// use localstorage to remember the index of quote before leaving the page
window.addEventListener("beforeunload", setLocalStorage);

export { data, randomNum, showQuote };
