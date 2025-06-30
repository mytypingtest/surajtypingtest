const paragraph = `Typing fast and accurately is a valuable skill. Keep practicing to get better every day.`;

const textDisplay = document.getElementById("textDisplay");
const inputField = document.getElementById("inputField");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const resultSummary = document.getElementById("resultSummary");

const userNameInput = document.getElementById("userName");
const modeSelect = document.getElementById("modeSelect");
const timeSelect = document.getElementById("timeSelect");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let currentIndex = 0;
let mistakes = 0;
let timer = null;
let timeLeft = 60;
let startTime = null;

function renderText() {
  textDisplay.innerHTML = '';
  for (let i = 0; i < paragraph.length; i++) {
    const span = document.createElement("span");
    span.innerText = paragraph[i];
    if (i === 0) span.classList.add("current");
    textDisplay.appendChild(span);
  }
}

function startTest() {
  const name = userNameInput.value.trim();
  if (!name) {
    alert("Please enter your name");
    return;
  }

  timeLeft = parseInt(timeSelect.value);
  inputField.disabled = false;
  inputField.focus();
  startBtn.disabled = true;
  userNameInput.disabled = true;
  modeSelect.disabled = true;
  timeSelect.disabled = true;
  inputField.value = '';
  currentIndex = 0;
  mistakes = 0;
  startTime = Date.now();
  resultSummary.classList.add("hidden");
  renderText();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) endTest();
  }, 1000);
  updateTimerDisplay();
}

function endTest() {
  clearInterval(timer);
  inputField.disabled = true;
  showResult();
}

function updateTimerDisplay() {
  const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const sec = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.innerText = `Time Left: ${min}:${sec}`;
}

function updateDisplay() {
  const userInput = inputField.value;
  const spans = textDisplay.querySelectorAll("span");
  currentIndex = userInput.length;
  mistakes = 0;

  spans.forEach((span, i) => {
    span.classList.remove("correct", "incorrect", "current");
    if (i < userInput.length) {
      if (userInput[i] === paragraph[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
        mistakes++;
      }
    } else if (i === userInput.length) {
      span.classList.add("current");
      span.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });

  const timeSpent = (Date.now() - startTime) / 60000;
  const wordsTyped = userInput.trim().split(/\s+/).length;
  const wpm = Math.round(wordsTyped / timeSpent) || 0;
  const accuracy = Math.max(0, Math.round(((userInput.length - mistakes) / userInput.length) * 100)) || 100;

  wpmDisplay.innerText = `WPM: ${wpm}`;
  accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
  mistakesDisplay.innerText = `Mistakes: ${mistakes}`;
}

function showResult() {
  resultSummary.classList.remove("hidden");
  resultSummary.innerHTML = `
    <strong>${userNameInput.value}</strong>, your test has ended.<br/>
    Final WPM: ${wpmDisplay.innerText.split(": ")[1]}<br/>
    Accuracy: ${accuracyDisplay.innerText.split(": ")[1]}<br/>
    Total Mistakes: ${mistakes}
  `;
}

function resetTest() {
  clearInterval(timer);
  inputField.value = '';
  inputField.disabled = true;
  userNameInput.disabled = false;
  modeSelect.disabled = false;
  timeSelect.disabled = false;
  startBtn.disabled = false;
  wpmDisplay.innerText = "WPM: 0";
  accuracyDisplay.innerText = "Accuracy: 100%";
  mistakesDisplay.innerText = "Mistakes: 0";
  resultSummary.classList.add("hidden");
  timerDisplay.innerText = "Time Left: 00:00";
  renderText();
}

inputField.addEventListener("input", updateDisplay);
startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

// Initial setup
renderText();
