
// script.js

// Elements
const usernameInput = document.getElementById("username");
const modeSelect = document.getElementById("mode");
const durationSelect = document.getElementById("duration");
const startBtn = document.getElementById("startBtn");

const typingArea = document.querySelector(".typing-area");
const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const timerEl = document.getElementById("timer");

const resultBox = document.querySelector(".result");
const resultName = document.getElementById("resultName");
const wpmResult = document.getElementById("wpm");
const accuracyResult = document.getElementById("accuracy");
const charsResult = document.getElementById("chars");
const timeUsedResult = document.getElementById("timeUsed");

let timer;
let timeLeft = 0;
let fullText = "";
let startTime;
let correctChars = 0;
let totalTyped = 0;

// Sample paragraphs
const paragraphs = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires both practice and patience.",
  "Consistency is the key to becoming a typing master.",
  "Focus on accuracy before you increase speed.",
  "Each correct keystroke brings you closer to mastery.",
  "Practice makes a man perfect in every field.",
  "Don't look at the keyboard while typing."
];

// Utilities
function getRandomParagraph() {
  return Array.from({ length: 3 }, () => paragraphs[Math.floor(Math.random() * paragraphs.length)]).join(" ");
}

// Display text with spans
function displayText(text) {
  textDisplay.innerHTML = "";
  text.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    textDisplay.appendChild(span);
  });
}

// Start Test
startBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  const mode = modeSelect.value;
  const duration = parseInt(durationSelect.value);

  if (!name) {
    alert("Please enter your name.");
    return;
  }

  document.querySelector(".input-section").classList.add("hidden");
  typingArea.classList.remove("hidden");

  fullText = getRandomParagraph();
  displayText(fullText);
  textInput.disabled = false;
  textInput.value = "";
  textInput.focus();
  timeLeft = duration;
  correctChars = 0;
  totalTyped = 0;
  startTime = new Date();

  updateTimer();
  timer = setInterval(updateTimer, 1000);
});

// Typing logic
textInput.addEventListener("input", () => {
  const input = textInput.value;
  totalTyped = input.length;
  const spans = textDisplay.querySelectorAll("span");

  let correct = 0;
  spans.forEach((span, i) => {
    const char = input[i];
    if (char == null) {
      span.classList.remove("correct", "incorrect");
    } else if (char === span.innerText) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
      correct++;
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
    }
  });

  correctChars = correct;

  // Optional: end test early if complete
  if (input.length >= fullText.length) {
    endTest();
  }
});

// Timer logic
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.innerText = `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  timeLeft--;

  if (timeLeft < 0) {
    clearInterval(timer);
    endTest();
  }
}

// End test
function endTest() {
  clearInterval(timer);
  textInput.disabled = true;
  typingArea.classList.add("hidden");
  resultBox.classList.remove("hidden");

  const timeUsed = (new Date() - startTime) / 60000; // in minutes
  const wpm = Math.round((correctChars / 5) / timeUsed);
  const accuracy = totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;

  resultName.innerText = usernameInput.value;
  wpmResult.innerText = wpm;
  accuracyResult.innerText = accuracy;
  charsResult.innerText = totalTyped;
  timeUsedResult.innerText = `${Math.round(timeUsed * 60)} seconds`;
}
