//your JS code here. If required.
const video = document.querySelector("video");
const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll("#time-select button");

let duration = 600; // default 10 mins

audio.src = "Sounds/beach.mp3";

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        video.play();
        playBtn.textContent = "Pause";
    } else {
        audio.pause();
        video.pause();
        playBtn.textContent = "Play";
    }
});

// Change sound & video
soundButtons.forEach(button => {
    button.addEventListener("click", () => {
        audio.src = button.getAttribute("data-sound");
        video.src = button.getAttribute("data-video");
        audio.play();
        video.play();
        playBtn.textContent = "Pause";
    });
});

// Change time
timeButtons.forEach(button => {
    button.addEventListener("click", () => {
        duration = button.getAttribute("data-time");
        updateTime(duration);
    });
});

// Update timer
audio.ontimeupdate = () => {
    let remaining = duration - audio.currentTime;
    if (remaining <= 0) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
        playBtn.textContent = "Play";
    }
    updateTime(remaining);
};

function updateTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    timeDisplay.textContent = `${minutes}:${seconds}`;
}
