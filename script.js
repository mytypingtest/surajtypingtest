const startBtn = document.getElementById("startTest");
const usernameInput = document.getElementById("username");
const testArea = document.getElementById("testArea");
const inputArea = document.getElementById("inputArea");
const textDisplay = document.getElementById("textDisplay");
const displayName = document.getElementById("displayName");
const timeSpan = document.getElementById("time");
const wpmSpan = document.getElementById("wpm");
const accuracySpan = document.getElementById("accuracy");
const mistakesSpan = document.getElementById("mistakes");

let timer, time = 0, interval = null;
let currentWordIndex = 0;
let words = [];
let totalChars = 0, mistakes = 0;

const paragraphs = [
  "Typing is a useful skill for everyone.",
  "Practice daily to improve your speed.",
  "Keep your eyes on the screen while typing.",
  "Accuracy is more important than speed.",
];

function startTest() {
  const name = usernameInput.value.trim();
  if (!name) {
    alert("Please enter your name!");
    return;
  }

  displayName.textContent = name;
  testArea.classList.remove("hidden");

  const randomText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  words = randomText.split(" ");
  totalChars = randomText.length;

  renderText();
  inputArea.disabled = false;
  inputArea.focus();
  inputArea.value = "";

  time = 0;
  mistakes = 0;
  currentWordIndex = 0;
  updateStats();

  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    time++;
    updateStats();
  }, 1000);
}

function renderText() {
  textDisplay.innerHTML = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    if (i === 0) span.classList.add("active-word");
    textDisplay.appendChild(span);
  });
}

function updateStats() {
  timeSpan.textContent = time;
  wpmSpan.textContent = Math.round(((currentWordIndex) / (time / 60)) || 0);
  const accuracy = Math.round(((totalChars - mistakes) / totalChars) * 100);
  accuracySpan.textContent = `${accuracy}%`;
  mistakesSpan.textContent = mistakes;
}

inputArea.addEventListener("input", () => {
  const currentInput = inputArea.value.trimEnd().split(" ");
  const wordElements = textDisplay.querySelectorAll("span");

  wordElements.forEach((span, i) => {
    span.classList.remove("correct", "incorrect", "active-word");

    if (currentInput[i] != null) {
      if (currentInput[i].toLowerCase() === words[i].toLowerCase()) {
        span.classList.add("correct");
      } else {
        span.classList.add("incorrect");
        mistakes++;
      }
    }

    if (i === currentInput.length) {
      span.classList.add("active-word");
    }
  });

  currentWordIndex = currentInput.length;
  updateStats();

  // New line auto-load when last word done
  if (currentInput.length === words.length) {
    inputArea.value = "";
    startTest();
  }
});

startBtn.addEventListener("click", startTest);
