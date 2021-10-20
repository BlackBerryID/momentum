import playList from "./playList";
const audio = new Audio();
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
let isPlay = false;
let playNum = 0;

function playAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
    changeButtonIcon();
  } else {
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    changeButtonIcon();
  }
}

function changeButtonIcon() {
  if (!isPlay) {
    playBtn.classList.remove("pause");
  } else {
    playBtn.classList.add("pause");
  }
}

function playNext() {
  if (playNum + 1 === playList.length) {
    playNum = 0;
  } else {
    playNum++;
  }
  audio.src = playList[playNum].src;
  songTitle.textContent = playList[playNum].title;
  audio.currentTime = 0;
  isPlay = true;
  changeButtonIcon();
  audio.play();
}

function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  audio.src = playList[playNum].src;
  songTitle.textContent = playList[playNum].title;
  audio.currentTime = 0;
  isPlay = true;
  changeButtonIcon();
  audio.play();
}

playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);

playList.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = item.title;
  playListContainer.append(li);
});

// custom player
const songTitle = document.querySelector(".song-title");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");

audio.src = playList[playNum].src;
songTitle.textContent = playList[playNum].title;
setTimeout(() => {
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  durationTime.innerHTML = formatTime(Math.floor(audio.duration));
}, 50);

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  if (durationTime.innerHTML === "NaN:NaN") {
    durationTime.innerHTML = "0:00";
  } else {
    durationTime.innerHTML = formatTime(Math.floor(audio.duration));
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

function changeProgressBar() {
  audio.currentTime = progressBar.value;
}

audio.addEventListener("timeupdate", updateProgressValue);
audio.addEventListener("ended", playNext);
progressBar.addEventListener("change", changeProgressBar);
