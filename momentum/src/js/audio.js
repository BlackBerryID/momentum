import playList from "./playList";
const audio = new Audio();
const playBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
let isPlay = false;
let playNum = 0;

playList.forEach((item) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = item.title;
  playListContainer.append(li);
});

const playItems = document.querySelectorAll(".play-item");

function playAudio() {
  if (isPlay) {
    audio.pause();
    isPlay = false;
    changeButtonIcon();
    highlightSong();
  } else {
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    changeButtonIcon();
    highlightSong();
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
  progressBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 0%, #e8e8ea 0%, white 100%)`;
  highlightSong();
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
  progressBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 0%, #e8e8ea 0%, white 100%)`;
  highlightSong();
}

playBtn.addEventListener("click", playAudio);
playNextBtn.addEventListener("click", playNext);
playPrevBtn.addEventListener("click", playPrev);

// custom player
const songTitle = document.querySelector(".song-title");
const currentTime = document.querySelector(".current-time");
const durationTime = document.querySelector(".duration-time");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");
const volumeBtn = document.querySelector(".volume");
let volumeBarValue = volumeBar.value;

audio.src = playList[playNum].src;
songTitle.textContent = playList[playNum].title;
setTimeout(() => {
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  durationTime.innerHTML = formatTime(Math.floor(audio.duration));
}, 50);

function updateProgressValue() {
  progressBar.max = audio.duration;
  console.log("progressBar.max: ", progressBar.max);
  progressBar.value = audio.currentTime;
  console.log("progressBar.value: ", progressBar.value);
  let changeValue = audio.currentTime / audio.duration;
  console.log("changeValue: ", changeValue);
  progressBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 ${
    changeValue * 100
  }%, #e8e8ea ${changeValue * 100}%, white 100%)`;
  currentTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  let durationTimeValue = formatTime(Math.floor(audio.duration));
  if (durationTimeValue !== "NaN:NaN") {
    durationTime.innerHTML = durationTimeValue;
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

function changeVolume(e) {
  let changeValue = e.offsetX / volumeBar.offsetWidth;
  changeValue = changeValue.toFixed(2);
  audio.volume = changeValue;
  volumeBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 ${
    changeValue * 100
  }%, #e8e8ea ${changeValue * 100}%, white 100%)`;
  volumeBar.value = volumeBarValue = changeValue;
  console.log(volumeBarValue);
  if (audio.volume === 0) {
    volumeBtn.style.backgroundImage = `url(./assets/svg/volume-muted.svg)`;
    volumeBtn.style.top = `52px`;
  } else {
    volumeBtn.style.backgroundImage = `url(./assets/svg/volume.svg)`;
    volumeBtn.style.top = `50px`;
  }
}

function toggleVolume() {
  if (audio.muted) {
    audio.muted = false;
    this.style.backgroundImage = `url(./assets/svg/volume.svg)`;
    this.style.top = `50px`;
    volumeBar.value = volumeBarValue;
    volumeBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 ${
      volumeBarValue * 100
    }%, #e8e8ea ${volumeBarValue * 100}%, white 100%)`;
  } else {
    audio.muted = true;
    this.style.backgroundImage = `url(./assets/svg/volume-muted.svg)`;
    this.style.top = `52px`;
    volumeBar.value = 0;
    volumeBar.style.background = `linear-gradient(to right, #d4af37 0%, #d4af37 0%, #e8e8ea 0%, white 100%)`;
  }
}

function highlightSong() {
  playItems.forEach((item) => item.classList.remove("item-active"));
  playItems[playNum].classList.add("item-active");
}

audio.addEventListener("timeupdate", updateProgressValue);
audio.addEventListener("ended", playNext);
progressBar.addEventListener("change", changeProgressBar);
volumeBtn.addEventListener("click", toggleVolume);

let isVolumeMousedown = false;
volumeBar.addEventListener(
  "mousemove",
  (e) => isVolumeMousedown && changeVolume(e)
);
volumeBar.addEventListener("mousedown", (e) => {
  e.preventDefault();
  isVolumeMousedown = true;
});
window.addEventListener("mouseup", () => (isVolumeMousedown = false));
