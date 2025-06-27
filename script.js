// script.js

let testText = "Typing practice helps improve speed and accuracy. Keep practicing regularly to get better.";
let timeLeft = 0;
let timerInterval;
let totalTyped = 0;
let correctChars = 0;

function startTest() {
  const username = document.getElementById("username").value.trim();
  const mode = document.getElementById("mode").value;
  const time = parseInt(document.getElementById("time").value);

  if (username === "") {
    alert("Please enter your name!");
    return;
  }

  document.getElementById("test-text").innerText = testText;
  document.getElementById("test-area").style.display = "block";
  document.getElementById("typing-area").value = "";
  document.getElementById("typing-area").disabled = false;
  document.getElementById("typing-area").focus();
  document.getElementById("wpm").innerText = "0";
  document.getElementById("accuracy").innerText = "100%";

  timeLeft = time;
  totalTyped = 0;
  correctChars = 0;
  document.getElementById("time-left").innerText = formatTime(timeLeft);

  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("time-left").innerText = formatTime(timeLeft);
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    endTest();
  }
}

function checkTyping() {
  const typed = document.getElementById("typing-area").value;
  totalTyped = typed.length;
  correctChars = 0;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === testText[i]) {
      correctChars++;
    }
  }

  const wordsTyped = typed.trim().split(/\s+/).length;
  const timeSpent = parseInt(document.getElementById("time").value) - timeLeft;
  const wpm = timeSpent > 0 ? Math.round((wordsTyped / timeSpent) * 60) : 0;
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 100;

  document.getElementById("wpm").innerText = wpm;
  document.getElementById("accuracy").innerText = accuracy + "%";
}

function endTest() {
  document.getElementById("typing-area").disabled = true;
  alert("Time's up! Test completed.");
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}
