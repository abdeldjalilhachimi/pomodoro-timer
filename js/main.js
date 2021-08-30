const breakBtnTime = document.getElementById("break");
const timeBreakDsiplay = document.getElementById("break-display");

const workBtnTime = document.getElementById("work");
const timeworkDsiplay = document.getElementById("work-display");

const time = document.getElementsByTagName("text");

const circle = document.querySelector(".circle-progress");
const radius = circle.r.baseVal.value;

const circumRefence = radius * 2 * Math.PI;

// circle.style.strokeDasharray = circumRefence;

let seconds = 0;
let breakSec = 0;
let pusedTime = false;

const btnStopTimer = document.getElementById("stop");
const btnStartTimer = document.getElementById("start");

displayTime(seconds);
displayTimeBreak(breakSec);
breakBtnTime.addEventListener("change", function (event) {
  let currValue = event.currentTarget.value;
  timeBreakDsiplay.innerHTML = currValue;
  breakSec = currValue * 60;
});

workBtnTime.addEventListener("change", function (event) {
  btnStartTimer.removeAttribute("disabled");
  let currValue = event.currentTarget.value;
  timeworkDsiplay.innerHTML = currValue;

  seconds = currValue * 60;
  displayTime(seconds);
});

btnStopTimer.addEventListener("click", function () {
  pusedTime = true;
});

btnStartTimer.addEventListener("click", function () {
  startTimer();
  pusedTime = false;
});

function displayTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  time[0].innerHTML = `${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
}

function displayTimeBreak(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  time[0].innerHTML = `${min < 10 ? "0" : ""}${min}:${
    sec < 10 ? "0" : ""
  }${sec}`;
}
let fakeTIme = [0, 10, 25, 75, 100];
function startTimer() {
  const countDown = setInterval(() => {
    seconds--;

    displayTime(seconds);
    circle.style.strokeDashoffset = Math.floor(
      circumRefence - (seconds / 100) * circumRefence
    );

    if (pusedTime) {
      clearInterval(countDown);
    }
    if (seconds <= 0 || seconds < 1) {
      // display a model to inform user that the time for a break
      breakTime(breakSec);
      clearInterval(countDown);
    }
  }, 1000);
}

function breakTime(sec) {
  const countDown = setInterval(() => {
    sec--;
    displayTimeBreak(sec);
    if (pusedTime) {
      clearInterval(countDown);
    }
    if (sec <= 0 || sec < 1) {
      endTimer();
      clearInterval(countDown);
    }
  }, 1000);
}

function endTimer() {
  time[0].innerHTML = `Well Done`;
}
