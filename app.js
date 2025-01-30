const timerContainer = document.querySelector(".timer-container");
const timer5 = document.getElementById("timer-5");
const timer10 = document.getElementById("timer-10");
const timer15 = document.getElementById("timer-15");
const timeDisplay = document.getElementById("time-display");
const alarmSound = document.getElementById("alarm");
const progressBar = document.getElementById("progress-bar");
const runnerPet = document.getElementById("runner");

let timerSecond;
let ticker;
let timeLeft;

function displayTimer() {
  let mins = Math.floor(timeLeft / 60); // create a variable to store the minutes. math.floor is used to round down the number
  let secs = timeLeft % 60; // create a variable to store the seconds. % is used to get the remainder of the division
  let prettyTime =
    (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
  document.getElementById("time-display").innerHTML = prettyTime;
}

function render() {
  let runnerPosition = (1 - timeLeft / timerSecond) * 100;
  let progressPercentage = (1 - timeLeft / timerSecond) * 100;
  // console.log(progressPercentage);
  progressBar.style.width = progressPercentage + "%";
  progressBar.style.display = "block";
  runnerPet.style.left = runnerPosition + "%";
}

function startTimer(secs) {
  // secs parameter used to pass the time in seconds, make the function to be dynamic
  timerContainer.style.display = "none";
  timerSecond = secs; // assign the initial seconds to the variable
  timeLeft = secs;
  // console.log("timeLeft", timeLeft);

  ticker = setInterval(
    (function setTime() {
      if (timeLeft > 11) {
        timeLeft--;
        displayTimer();
        render();
        return setTime;
      } else if (timeLeft > 0 && timeLeft <= 11) {
        alarmSound.play();
        timeLeft--;
        displayTimer();
        render();
      } else if (timeLeft === 0) {
        clearInterval(ticker);
      }
    })(),
    1000
  );
  render();
}

timer5.addEventListener("click", () => {
  startTimer(5 * 60);
});

timer10.addEventListener("click", () => {
  startTimer(10 * 60);
});

timer15.addEventListener("click", () => {
  startTimer(15 * 60);
});
