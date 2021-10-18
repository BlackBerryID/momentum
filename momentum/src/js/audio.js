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
