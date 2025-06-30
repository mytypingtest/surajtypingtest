const startBtn = document.getElementById("startBtn");
const inputArea = document.getElementById("inputArea");
const textDisplay = document.getElementById("textDisplay");
const typingBox = document.getElementById("typingBox");
const resultBox = document.getElementById("resultBox");

const username = document.getElementById("username");
const modeSelect = document.getElementById("modeSelect");
const timeSelect = document.getElementById("timeSelect");
const examParagraph = document.getElementById("examParagraph");

const userDisplay = document.getElementById("userDisplay");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const errors = document.getElementById("errors");
const timerDisplay = document.getElementById("timerDisplay");

let timeLeft, timer, currentText = "", startTime, errorCount = 0;

const practiceParagraphs = [
  "Typing improves with daily practice and dedication.",
  "Focus on accuracy before speed in typing tests.",
  "Consistent effort leads to better typing skills.",
  "Practice typing with both hands and all fingers."
];

startBtn.onclick = () => {
  const name = username.value.trim();
  const mode = modeSelect.value;
  const time = parseInt(timeSelect.value);

  if (!name) return alert("Please enter your name");

  if (mode === "exam" && !examParagraph.value.trim()) {
    return alert("Please paste paragraph for exam mode");
  }

  currentText = mode === "exam" ? examParagraph.value.trim() :
    practiceParagraphs[Math.floor(Math.random() * practiceParagraphs.length)];

  textDisplay.innerHTML = currentText;
  inputArea.value = "";
  typingBox.style.display = "block";
  startBtn.disabled = true;

  timeLeft = time * 60;
  startTime = new Date();

  timer = setInterval(updateTimer, 1000);
  inputArea.focus();
};

inputArea.addEventListener("input", () => {
  const typedText = inputArea.value;
  let correct = 0;
  errorCount = 0;

  const display = currentText.split("").map((char, i) => {
    if (typedText[i] == null) return `<span>${char}</span>`;
    if (typedText[i].toLowerCase() === char.toLowerCase()) {
      correct++;
      return `<span style="color: green;">${char}</span>`;
    } else {
      errorCount++;
      return `<span style="color: red;">${char}</span>`;
    }
  }).join("");

  textDisplay.innerHTML = display;

  if (typedText.length === currentText.length) finishTest();
});

function updateTimer() {
  if (timeLeft <= 0) return finishTest();

  const min = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const sec = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `Time Left: ${min}:${sec}`;
  timeLeft--;
}

function finishTest() {
  clearInterval(timer);
  inputArea.disabled = true;
  const endTime = new Date();
  const timeTaken = (endTime - startTime) / 60000;

  const totalWords = inputArea.value.trim().split(/\s+/).length;
  const wpmCalc = Math.round(totalWords / timeTaken);
  const accuracyCalc = Math.max(0, 100 - Math.round((errorCount / currentText.length) * 100));

  userDisplay.textContent = `User: ${username.value}`;
  wpm.textContent = `WPM: ${wpmCalc}`;
  accuracy.textContent = `Accuracy: ${accuracyCalc}%`;
  errors.textContent = `Errors: ${errorCount}`;
  resultBox.style.display = "block";
}
