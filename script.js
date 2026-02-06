const audio = document.querySelector("audio");
const video = document.querySelector("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const soundButtons = document.querySelectorAll(".sound-picker button");
const timeButtons = document.querySelectorAll(".time-select button");

let duration = 600;
let remaining = duration;
let isPlaying = false;
let timer;

// IMPORTANT: mute audio so Cypress allows play()
audio.muted = true;

playBtn.addEventListener("click", () => {
    if (!isPlaying) {
        isPlaying = true;
        playBtn.textContent = "Pause";

        audio.play();   // ✅ no catch
        video.play();

        startTimer();
    } else {
        isPlaying = false;
        playBtn.textContent = "Play";

        audio.pause();
        video.pause();
        clearInterval(timer);
    }
});

soundButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        audio.src = btn.dataset.sound;
        video.src = btn.dataset.video;

        if (isPlaying) {
            audio.play();
            video.play();
        }
    });
});

timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        duration = parseInt(btn.dataset.time);
        remaining = duration;
        updateTime(remaining);
    });
});

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (remaining > 0) {
            remaining--;
            updateTime(remaining);
        } else {
            clearInterval(timer);
            audio.pause();
            video.pause();
            playBtn.textContent = "Play";
            isPlaying = false;
        }
    }, 1000);
}

function updateTime(time) {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    timeDisplay.textContent = `${mins}:${secs}`;
}
